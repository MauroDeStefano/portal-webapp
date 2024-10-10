interface GenericErrorMessageProps {
    children: React.ReactNode | string;
}

export default function GenericErrorMessage({children}: GenericErrorMessageProps) {
    return (
        <div
            className="m-8 border border-b-orange-700 border-solid max-w-3xl inset-auto p-8 rounded-2xl">{children}</div>
    );
};