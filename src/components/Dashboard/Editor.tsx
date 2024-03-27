import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App({ editorRef } : { editorRef: React.MutableRefObject<any> }) {
    return (
        <>        
            <Editor

                apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY as string}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ]
                }}
            />
        </>
    );
}