import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SessionRefresh() {
    const { status, update } = useSession();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (status === 'authenticated' && !isInitialized) {
            update(); // Refresh session from database on first load
            setIsInitialized(true);
        }
    }, [status, isInitialized, setIsInitialized, update]);

    return null;
};