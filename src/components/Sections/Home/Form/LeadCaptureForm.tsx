"use client"

import { type CSSProperties, type FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

import { inputTransition, inputVariants, tabBackgroundVariants, tabTransition, type TabType } from './formConfig'

interface LeadCaptureFormProps {
    className?: string
    variant?: 'default' | 'cta'
}

export default function LeadCaptureForm({className, variant = 'default'}: LeadCaptureFormProps) {
    const [activeTab, setActiveTab] = useState<TabType>('email')
    const [emailValue, setEmailValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const value = activeTab === 'email' ? emailValue : phoneValue

        if (value.trim()) {
            setEmailValue('')
            setPhoneValue('')
        }
    }

    const isCtaVariant = variant === 'cta'
    const tabBorderColor = isCtaVariant ? 'var(--color-dark)' : '#29406D'
    const tabBackgroundColor = isCtaVariant ? 'var(--color-violet)' : 'var(--color-violet)'
    const tabLabelActiveColor = isCtaVariant ? 'text-[var(--color-dark)]' : 'text-[var(--color-black)]'
    const tabLabelInactiveColor = isCtaVariant ? 'text-[rgba(250,248,237,0.75)]' : 'text-[#7A7A7A]'
    const labelColor = isCtaVariant ? 'text-[var(--color-dark)]' : 'text-[var(--color-white)]'
    const inputBorder = isCtaVariant ? 'border-[var(--color-dark)]' : 'border-[var(--color-white)]'
    const inputText = isCtaVariant ? 'text-[var(--color-dark)]' : 'text-[var(--color-white)]'
    const placeholderColor = isCtaVariant ? 'placeholder:text-[var(--color-dark)]' : 'placeholder:text-[var(--color-white)]'
    const focusBorder = isCtaVariant ? 'focus:border-[var(--color-dark)] focus:bg-[rgba(255,255,255,0.25)]' : 'focus:border-[var(--color-violet)] focus:bg-white/10'
    const submitButton = isCtaVariant
        ? 'bg-[var(--color-dark)] text-[var(--color-pop-corn)] hover:bg-[rgba(17,19,35,0.85)]'
        : 'bg-[var(--color-violet)] text-[var(--color-black)] hover:bg-[#6B5FD8]'

    return (
        <form
            onSubmit={handleSubmit}
            className={clsx(
                'w-full flex flex-col gap-[30px] mr-auto',
                isCtaVariant && '!w-auto mx-auto',
                className,
            )}
        >
            <div
                className="relative flex max-w-[152px] overflow-hidden rounded-[5px]"
                style={{
                    '--after-content': '""',
                    '--after-position': 'absolute',
                    '--after-bottom': '0',
                    '--after-left': '0',
                    '--after-width': 'calc(100% - 1px)',
                    '--after-height': 'calc(100% - 1px)',
                    '--after-border-radius': '5px',
                    '--after-outline': `1px solid ${tabBorderColor}`,
                    backgroundColor: isCtaVariant ? 'var(--color-dark)' : 'transparent',
                } as CSSProperties}
            >
                <div
                    className="absolute bottom-0 left-0 w-[calc(100%-1px)] h-[calc(100%-1px)] rounded-[5px] border pointer-events-none"
                    style={{ borderColor: tabBorderColor }}
                />
                <motion.div
                    className="absolute top-0 left-0 w-1/2 h-[calc(100%+1px)] z-[2]"
                    style={{
                        backgroundColor: tabBackgroundColor,
                        borderRadius:
                            activeTab === 'email'
                                ? '5px 0 0 5px'
                                : '0 5px 5px 0',
                    }}
                    variants={tabBackgroundVariants}
                    animate={activeTab}
                    transition={tabTransition}
                />
                <button
                    type="button"
                    className={clsx(
                        'flex items-center justify-center relative z-[3] py-[10px] px-[20px] w-[76px] min-h-[40px] font-semibold text-[14px] leading-[18px] cursor-pointer transition-colors ease-in-out border-0 bg-transparent',
                        activeTab === 'email' ? tabLabelActiveColor : tabLabelInactiveColor,
                        isCtaVariant
                            ? 'rounded-l-[5px]'
                            : 'bg-transparent rounded-[5px] hover:text-[var(--color-white)]'
                    )}
                    onClick={() => setActiveTab('email')}
                >
                    Email
                </button>
                <button
                    type="button"
                    className={clsx(
                        'flex items-center justify-center relative z-[3] py-[10px] px-[20px] w-[76px] min-h-[40px] font-semibold text-[14px] leading-[18px] cursor-pointer transition-colors ease-in-out border-0 bg-transparent',
                        activeTab === 'phone' ? tabLabelActiveColor : tabLabelInactiveColor,
                        isCtaVariant
                            ? 'rounded-r-[5px]'
                            : 'bg-transparent rounded-[5px] hover:text-[var(--color-white)]'
                    )}
                    onClick={() => setActiveTab('phone')}
                >
                    Phone
                </button>
            </div>

            <div className="relative max-w-[350px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'email' && (
                        <motion.div
                            key="email"
                            variants={inputVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={inputTransition}
                            className="flex flex-col gap-[12px]"
                        >
                            <label
                                htmlFor="cta-email"
                                className={clsx('font-normal text-[14px] leading-[18px] text-left', labelColor)}
                            >
                                Email ID
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="cta-email"
                                    type="email"
                                    value={emailValue}
                                    onChange={(event) => setEmailValue(event.target.value)}
                                    placeholder="Enter Your Email ID"
                                    className={clsx(
                                        'w-full py-[16px] pr-[60px] pl-[20px] bg-transparent border-0 border-b font-normal text-[16px] backdrop-blur-[10px] transition-all ease-in-out placeholder:opacity-70 focus:outline-none focus:rounded-[5px]',
                                        inputBorder,
                                        inputText,
                                        placeholderColor,
                                        focusBorder,
                                    )}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={clsx(
                                        'absolute right-0 top-1/2 w-[40px] h-[40px] border-0 rounded-[8px] cursor-pointer flex items-center justify-center transition-all ease-in-out hover:scale-105',
                                        submitButton,
                                    )}
                                    style={{ transform: 'translateY(-50%)' }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'phone' && (
                        <motion.div
                            key="phone"
                            variants={inputVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={inputTransition}
                            className="flex flex-col gap-[12px]"
                        >
                            <label
                                htmlFor="cta-phone"
                                className={clsx('font-normal text-[14px] leading-[18px] text-left', labelColor)}
                            >
                                Phone Number
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="cta-phone"
                                    type="tel"
                                    value={phoneValue}
                                    onChange={(event) => setPhoneValue(event.target.value)}
                                    placeholder="Enter Your Phone Number"
                                    className={clsx(
                                        'w-full py-[16px] pr-[60px] pl-[20px] bg-transparent border-0 border-b font-normal text-[16px] backdrop-blur-[10px] transition-all ease-in-out placeholder:opacity-70 focus:outline-none focus:rounded-[5px]',
                                        inputBorder,
                                        inputText,
                                        placeholderColor,
                                        focusBorder,
                                    )}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={clsx(
                                        'absolute right-0 top-1/2 w-[40px] h-[40px] border-0 rounded-[8px] cursor-pointer flex items-center justify-center transition-all ease-in-out hover:scale-105',
                                        submitButton,
                                    )}
                                    style={{ transform: 'translateY(-50%)' }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </form>
    )
}
