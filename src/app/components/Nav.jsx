import Link from "next/link";

export default function Nav (){
    return <nav>
        <h3>SpacENewS.com </h3>
        <Link href={"/neo"}>Neo</Link>
        <Link href={"/donki"}>DONKI</Link>
        <Link href={"/eonet"}>EONET</Link>
        <Link href={"/epic"}>EPIC</Link>
        <Link href={"/exoplanet"}>Exoplanet</Link>
        <Link href={"/gibs"}>GIBS</Link>
        <Link href={"/mars"}>Mars Rover Photos</Link>
        <Link href={"/search"}>Search</Link>
    </nav>
}