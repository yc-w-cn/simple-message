import { Button } from 'antd';
import { ReactNode } from 'react';

export default function OperationButton({
  text,
  icon,
  onClick = () => {},
}: {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      type="link"
      className="w-[60px] h-[60px] flex flex-col justify-center items-center bg-[#2b2c3d] rounded-2xl hover:bg-[#3277fc]"
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs pb-1">{text}</span>
    </Button>
  );
}
