import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IPermissionsReturns } from '@/pages/admin/dashboard/roles';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import permissions from '@/helpers/permissions';
import { http as axios } from '@/helpers/http';
import Select from 'react-select'

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

interface IFormData {
    name?: string;
    permissions?: IPermissionsReturns[];
}

interface IRoleReturnsJSON {
    id: number;
    name: string;
    permissions: string;
    mPermissions: IPermissionsReturns[];
}

export default function editRole({ role, permissions }: { role: IRoleReturnsJSON, permissions: IPermissionsReturns[] }) {
    const router = useRouter();
    const roleId = router.query.id;

    const [getRole, setRole] = useState<IRoleReturnsJSON>(role);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.name === ''
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });

        if (!form || !form.permissions || form.permissions?.length <= 0
        ) return setNotify({ open: true, type: 'warning', text: 'At least one permission should be selected, rejecting!' });

        axios.post('/api/admin/roles/edit', {
            id: roleId,
            name: form.name,
            permissions: form.permissions,
        }).then((res) => {
            if (res.data.success) {
                setNotify({ open: true, type: 'success', text: res.data.message });

                // Ignore form type, this is valid because we already doing a check for form fields up
                setRole((prevData) => ({ ...form as any, id: prevData.id }));
            } else if (res.data.error?.message) {
                setNotify({ open: true, type: 'warning', text: res.data.error.message });
            }
        }) 
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number | any | any[] }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    useEffect(() => {
        setFormData({
            'name': getRole.name,
            'permissions': getRole.mPermissions,
        });
    }, []);

    return (
        <Layout title={`Role - ${roleId}`}>
            {form && (
                <>
                    <Notification
                        setNotify={setNotify}
                        open={notify.open}
                        type={notify.type}
                        text={notify.text}
                        duration={notify.duration}
                    />

                    <div className={'flex justify-start'}>
                        <button onClick={() => Router.back()} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                            Back
                        </button>
                    </div>

                    <div style={{ backgroundColor: 'hsl(0, 0%, 22%)'}} className='p-3 rounded-lg mt-3'>
                        <form onSubmit={onSubmitForm} action="" className='space-y-4'>

                                <div className="space-y-2 grid">
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="name">Name</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            onChange={(e) => updateFormData({ name: 'name', value: e.target.value })}
                                            defaultValue={form.name}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="permissions">Roles</label>
                                        </div>

                                        <div id="permissions" className={'text-black'}>
                                            <Select
                                                isMulti
                                                defaultValue={form.permissions}
                                                options={permissions}
                                                className='capitalize'
                                                getOptionLabel={(option) => `${option.name.replaceAll('_', ' ')}`}
                                                getOptionValue={(option) => `${option.id}`}
                                                onChange={(selection) => updateFormData({ name: 'permissions', value: selection })}
                                            />
                                        </div>
                                    </div>
                                </div>

                            <div className="flex justify-center mt-3">
                                <button type='submit' className='px-8 py-3 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </Layout>
    )
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;

    const role = await executeQueryReturnsJSON({
        query: query.getRoleByID,
        values: [id],
    }) as IRoleReturnsJSON[];

    const rolePermissions = JSON.parse(role[0].permissions)

    for (let i = 0; i < rolePermissions.length; i++) {
        const rolePermission = rolePermissions[i];
        
        for (let j = 0; j < permissions.length; j++) {
            const permission = permissions[j];

            if(rolePermission === permission.id) {
                if(!role[0].mPermissions) role[0] = { ...role[0], mPermissions: [] };

                role[0].mPermissions.push(permission);
            }
        }
    }

    return {
        props: {
            role: role[0] || {},
            permissions: permissions || []
        }
    }
}) satisfies GetServerSideProps<{ role: IRoleReturnsJSON, permissions: IPermissionsReturns[] }>