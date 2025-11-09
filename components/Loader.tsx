"use client";

import {motion, AnimatePresence} from "framer-motion";

export default function Loader() {
    return (
        <AnimatePresence>
            <motion.div
                key="preloader"
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
            >
                <motion.div
                    initial={{  rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="border-[5px] border-gray border-t-yellow-400 w-12 h-12 rounded-full">

                    </div>
                </motion.div>
                <span>Loading chart...</span>
            </motion.div>
        </AnimatePresence>
    );
}
