import Link from "next/link";

export default function Nav (){
    return <nav>
        <Link href={'/'}>SpacENewS.com</Link>
        <Link href={"/neo"}>NEO</Link>
        <Link href={"/eonet"}>EONET</Link>
        <Link href={"https://me-me-me-beige.vercel.app/"}>DIV</Link>
    </nav>
}