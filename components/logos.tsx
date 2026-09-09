import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "./ui/text-blur";
import { FaAndroid, FaApple, FaWindows, FaLinux } from "react-icons/fa6";

const platforms = [
  { name: "Android", icon: FaAndroid },
  { name: "macOS", icon: FaApple },
  { name: "Windows", icon: FaWindows },
  { name: "Linux", icon: FaLinux },
];

export default function Logos() {
  return (
    <motion.div
      className="flex h-full w-full flex-col gap-2 pb-12 pt-12 md:pb-24 md:pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-200 md:text-3xl"
          text="Available for Testing"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-base text-zinc-300 sm:text-lg"
          text="Cross-platform clipboard & input sharing across all your devices"
          duration={0.8}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 grid w-full grid-cols-2 items-center justify-center gap-4 sm:grid-cols-4 md:mt-6 md:gap-6">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <div
              key={index}
              className="flex h-24 sm:h-28 flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#2e3034] bg-[#202124] p-4 transition-all duration-150 ease-in-out hover:border-white/20 hover:bg-[#28292b]">
              <Icon className="h-7 w-7 text-white" />
              <span className="text-sm font-medium text-[#8f9296]">{platform.name}</span>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

