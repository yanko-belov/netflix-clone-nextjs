import { FC } from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute left-0 top-14 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-4">
        <div className="hover:unrerline px-3 text-center text-white">Home</div>
        <div className="hover:unrerline px-3 text-center text-white">
          Series
        </div>
        <div className="hover:unrerline px-3 text-center text-white">Films</div>
        <div className="hover:unrerline px-3 text-center text-white">
          New & Popular
        </div>
        <div className="hover:unrerline px-3 text-center text-white">
          My List
        </div>
        <div className="hover:unrerline px-3 text-center text-white">
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
