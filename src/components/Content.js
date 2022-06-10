const Content = () => {
  const api_key = 'c02e58a592fdf4370e9e827a74584a1e';
  const url = "https://jsonplaceholder.typicode.com/posts/1";
  const getdata = (func) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => func(data));
  const handle = (data) => {
    console.log(data);
  };
  getdata(handle);
  return (
    <>
      <h1>Content</h1>
    </>
  );
};
export default Content;
