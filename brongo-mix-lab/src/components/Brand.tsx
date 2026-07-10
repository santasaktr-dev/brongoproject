import Image from "next/image";
export function Mascot({happy=false}:{happy?:boolean}){return <Image className="mascot" src={happy?"/brand/mascot-orange.png":"/brand/mascot-yellow.png"} width={612} height={408} alt="" priority/>}
export function ProductVisual(){return <div className="products"><Image src="/brand/brongo-bottle.png" width={408} height={611} alt="ขวดยาน้ำ BRONGO ขนาด 40 มิลลิลิตร"/><Image src="/brand/brongo-box.png" width={433} height={577} alt="กล่องยาน้ำ BRONGO สำหรับเด็ก"/></div>}
