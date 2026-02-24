"use client"
import { useGetMarketStatusQuery, usePauseMarketMutation } from '@/app/api/admin/pause-unpause/pauseUnpauseApi';
import { errorMessage } from '@/lib/msg/errorAlert';
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner';

const Page = () => {

    const { data, isLoading, refetch } = useGetMarketStatusQuery({});
    const [pauseMarket, { isLoading: isPausing }] = usePauseMarketMutation();

    const handleToggle = async () => {
        try {
            const res = await pauseMarket({}).unwrap();
            if (res) {
                toast.success(res?.message);
                refetch(); // refresh status after mutation
            }
        } catch (error) {
            errorMessage(error);
        }
    };

    const isPaused = data?.data?.status === "Locked";

    return (
        <div>
            <div>
                <h1 className='font-semibold text-5xl text-[#E8442D]'>
                    Emergency Protocol
                </h1>
                <p className='text-2xl textColor mt-4'>
                    Immediately pause all prediction activities on the smart contract level.
                </p>
            </div>

            {isPaused ? (
                <div className='border-2 mt-14 pb-7 pt-14 px-11 rounded-4xl bg-[#ECFBEB4D]'>
                    <div className='flex gap-x-7'>
                        <div className="w-22.75 h-22.75 bg-[#FFC7BF] rounded-full flex justify-center items-center">
                            <Image
                                src="/logo/e-two.svg"
                                width={41}
                                height={41}
                                alt="e-logo"
                            />
                        </div>

                        <div>
                            <h1 className='text-[#E8442D] font-semibold text-3xl'>
                                Contract Status: <span className='text-[#00993B]'>PAUSED</span>
                            </h1>
                            <p className='textColor text-2xl my-2'>
                                The contract is currently PAUSED. All position deposits are disabled globally.
                            </p>
                            <button
                                onClick={handleToggle}
                                disabled={isPausing}
                                className='bg-[#33AD62] px-10 py-4 cursor-pointer rounded-4xl text-lg text-white font-semibold'
                            >
                                {isPausing ? "Processing..." : "UNPAUSE CONTRACT"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='border-2 border-[#D447354D] mt-14 pb-7 pt-14 px-11 rounded-4xl bg-[#FBEDEB4D]'>
                    <div className='flex gap-x-7'>
                        <div className="w-22.75 h-22.75 bg-[#FFC7BF] rounded-full flex justify-center items-center">
                            <Image
                                src="/logo/e-logo.svg"
                                width={41}
                                height={41}
                                alt="e-logo"
                            />
                        </div>

                        <div>
                            <h1 className='text-[#E8442D] font-semibold text-3xl'>
                                Contract Status: ACTIVE
                            </h1>
                            <p className='textColor text-2xl my-2'>
                                Pausing the contract will disable all deposits globally. Use only for security exploits.
                            </p>
                            <button
                                onClick={handleToggle}
                                disabled={isPausing}
                                className='bg-[#E8442D] px-10 py-4 cursor-pointer rounded-4xl text-lg text-white font-semibold'
                            >
                                {isPausing ? "Processing..." : "TRIGGER GLOBAL PAUSE"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;