import { azkarTypes } from "@/services/ziker";
import { VscIndexZero } from "react-icons/vsc";
import ZikrCard from "./ZikrCard";

export default function AthkarMainPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex items-start gap-3 my-10 flex-col">
        <h1 className="text-se-primary-light text-4xl">Athkar Page</h1>
        <span className="h-1 w-[60vw] bg-amber-400"></span>
      </div>
      <div className="grid grid-cols-3 items-center gap-10 mx-10">
        {azkarTypes.map(({ name, id, desc }) => (
          <ZikrCard key={id} name={name} desc={desc} id={id}/>
        ))}
      </div>
    </div>
  );
}
