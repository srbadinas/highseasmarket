const generateUniqueId = (id) => {
    return `${id}-${Math.floor(Math.random() * 1000)}`;
}

export default generateUniqueId