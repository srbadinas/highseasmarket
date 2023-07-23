const fieldChange = (event, data, setData) => {
  if (event.target.type === "file") {
    [...event.target.files].map((item) => {
      data[event.target.name].push(item);
      setData({ ...data });
    });

    return false;
  }
  setData({ ...data, [event.target.name]: event.target.type == 'checkbox' ? event.target.checked : event.target.value });
}

export default fieldChange