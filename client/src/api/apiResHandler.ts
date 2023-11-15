const handleApiRes = async (res: Response) => {
    const data = await res.json();
    if (!res.ok)
        throw new Error(data.message);
    return data;
}

export default handleApiRes;