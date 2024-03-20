import GlobeTmpl from "react-globe.gl";

const Globe = ({ forwardRef, ...otherProps }: any) => (
    <div className="cursor-grab">
        <GlobeTmpl {...otherProps} ref={forwardRef} />
    </div>
);

export default Globe;