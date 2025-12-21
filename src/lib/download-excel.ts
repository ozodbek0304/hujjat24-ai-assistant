type Arg = {
    data: Blob | string;
    name?: string;
    extension?: string,
};

export function downloadExcel({ data, name = "hisobot", extension = "pptx", }: Arg) {
    const blob = new Blob([data])
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
}
