import Marquee from "react-fast-marquee";
import Image from "next/image";

const MarqueePerusahaan = () => {
    return (
        <div className="py-4 space-y-10">
            <div className="text-center">
                <h3 className="body-semibold md:text-4xl text-secondary">Mitra</h3>
            </div>
            <Marquee gradient={false} speed={50}>
                <div className="flex items-center">
                    <Image
                        src={'/LogoMitra.png'}
                        alt={"Logo"}
                        width={1500}
                        height={800}
                    />
                </div>
            </Marquee>
        </div>
    )
}

export default MarqueePerusahaan