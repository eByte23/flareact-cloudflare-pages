export async function getEdgeProps() {
//   const data = await someFallbackDataRequest();

  return {
    props: {
    //   data,
    },
    notFound: true, // send 404 header
    revalidate: 60, // Revalidate your data once every 60 seconds
  };
}

export default function NotFound() {
  return (
    <>
      <h1>404!</h1>
    </>
  );
}
