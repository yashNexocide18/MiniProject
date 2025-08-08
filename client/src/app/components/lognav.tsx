import Image from "next/image";

export default function LogNav(){
    return(
        <div className="">
            <div className="flex items-center ">
                <Image src="/person.svg" alt="logo" height={40} width={40} />
                <h1 className="lg:text-3xl ">Ur<span className="text-blue-500">Content</span></h1>
                
            </div>
        </div>
    );
}