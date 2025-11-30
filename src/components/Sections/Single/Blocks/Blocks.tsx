import Container from "@/components/Common/Container/Container";
import About from "@/components/Sections/Home/About/About";
import MaskText from "@/components/Ui/MaskText/MaskText";
import Image from "next/image";

export default function Blocks () {
    return (
        <section className="py-[50px]">
            <h2 className="sr-only">Hidden title for seo</h2>
            <Container maxWidth={1180}>
                <div className="flex flex-col items-center gap-[60px] md:gap-[40px]">
                    <h3 className="font-bold text-[32px] leading-[48px] text-center text-[var(--color-pop-corn)] md:text-[60px] md:leading-[90px]">You don’t need one more subscription</h3>
                    <div className="flex items-start flex-col lg:flex-row w-full gap-[20px]">
                        <div className="flex flex-col flex-1 gap-[32px] w-[100%]">
                          <div className="flex flex-col flex-1 bg-[#162542] rounded-[20px] p-[30px] lg:p-[40px] gap-[30px]">
                              <MaskText show={true}>
                                  <h4 className="flex flex-col items-start font-bold text-[22px] leading-[30px] md:text-[32px] md:leading-[48px] text-[var(--color-pop-corn)]">
                                      MovieMe is the
                                      <em>un-subscription</em>
                                  </h4>
                              </MaskText>
                              <p className="font-bold text-[18px] leading-[22px] md:text-[22px] md:leading-[30px] text-[var(--color-pop-corn)] ml-auto">
                                  Handpicked films, <br/>
                                  not an endless scroll.
                              </p>
                          </div>
                            <About small={true} />
                        </div>
                        <div className="flex flex-col items-center flex-1 gap-[32px] lg:py-[80px] w-[100%]">
                            <div className="w-[100%] flex flex-col items-center bg-[#162542] rounded-[20px] gap-[30px] md:gap-[50px] px-[20px] py-[30px] lg:py-[40px]">
                                <h5 className="font-bold text-[18px] leading-[22px] md:text-[22px] md:leading-[30px] text-[var(--color-pop-corn)]">
                                    Stream one on. Finish on the other.
                                </h5>
                                <Image className="w-full h-auto" src="/img/steps-r.svg" width={464} height={330} alt="steps" />
                            </div>
                            <div className="w-[100%] flex flex-col bg-[#162542] rounded-[20px] p-[30px] lg:p-[40px] gap-[30px] md:gap-[50px]">
                                <p className="font-bold text-[22px] leading-[30px] md:text-[32px] md:leading-[48px] text-[var(--color-pop-corn)]">
                                    With MovieMe there are <br/>
                                    no monthly fees
                                </p>
                                <p className="font-bold text-[22px] leading-[30px] md:text-[32px] md:leading-[48px] text-[var(--color-violet)] ml-auto">
                                    Just pay for the <br/>
                                    movies you watch.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}