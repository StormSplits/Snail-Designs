import React from "react";
import LinkButton from "../../ui/LinkButton";

export default function ContactUs() {
	return (
		<div className="container bg-black my-30 flex flex-row items-center  overflow-hidden">
			<div className=" pt-10 pb-5 grow shrink-0">
				<h1 className="text-xl md:text-[4vmax]  leading-snug font-bold mb-4">
					Let's Create <br />
					Something Together
				</h1>

				<div className="mt-60 font-CircularLight">
					<LinkButton text={"Get In Touch"} url={"/contact"} />
				</div>
			</div>

			<div className="cube_container shrink-0 ">
				<div className="box">
					<div className="cube size-28 lg:size-40 xl:size-52"></div>
				</div>
			</div>
		</div>
	);
}
