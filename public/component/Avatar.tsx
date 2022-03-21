import { Avatar } from "@mui/material";

interface AvartarProps {
  name: string;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`,
  };
}

export function AvartarComponent(props: AvartarProps) {
  return <Avatar {...stringAvatar(props.name)} />;
}
