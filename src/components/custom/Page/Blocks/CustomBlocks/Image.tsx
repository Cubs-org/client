export const Image = (props) => {
    const { url } = props;
    return (
      <img
        className="rounded-md resize"
        src={url}
        alt={url}
      />
    );
  };