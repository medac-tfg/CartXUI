import * as aiIcons from "react-icons/ai";
import * as biIcons from "react-icons/bi";
import * as bsIcons from "react-icons/bs";
import * as cgIcons from "react-icons/cg";
import * as ciIcons from "react-icons/ci";
import * as diIcons from "react-icons/di";
import * as faIcons from "react-icons/fa";
import * as fa6Icons from "react-icons/fa6";
import * as fcIcons from "react-icons/fc";
import * as fiIcons from "react-icons/fi";
import * as giIcons from "react-icons/gi";
import * as goIcons from "react-icons/go";
import * as grIcons from "react-icons/gr";
import * as hiIcons from "react-icons/hi";
import * as hi2Icons from "react-icons/hi2";
import * as imIcons from "react-icons/im";
import * as ioIcons from "react-icons/io";
import * as io5Icons from "react-icons/io5";
import * as liaIcons from "react-icons/lia";
import * as luIcons from "react-icons/lu";
import * as mdIcons from "react-icons/md";
import * as piIcons from "react-icons/pi";
import * as riIcons from "react-icons/ri";
import * as rxIcons from "react-icons/rx";
import * as siIcons from "react-icons/si";
import * as slIcons from "react-icons/sl";
import * as tbIcons from "react-icons/tb";
import * as tfiIcons from "react-icons/tfi";
import * as tiIcons from "react-icons/ti";
import * as vscIcons from "react-icons/vsc";
import * as wiIcons from "react-icons/wi";

const iconsMap: { [key: string]: { [key: string]: React.ComponentType } } = {
  ai: aiIcons,
  bi: biIcons,
  bs: bsIcons,
  cg: cgIcons,
  ci: ciIcons,
  di: diIcons,
  fa: faIcons,
  fa6: fa6Icons,
  fc: fcIcons,
  fi: fiIcons,
  gi: giIcons,
  go: goIcons,
  gr: grIcons,
  hi: hiIcons,
  hi2: hi2Icons,
  im: imIcons,
  io: ioIcons,
  io5: io5Icons,
  lia: liaIcons,
  lu: luIcons,
  md: mdIcons,
  pi: piIcons,
  ri: riIcons,
  rx: rxIcons,
  si: siIcons,
  sl: slIcons,
  tb: tbIcons,
  tfi: tfiIcons,
  ti: tiIcons,
  vsc: vscIcons,
  wi: wiIcons,
};

export const getIcon = (
  lib: string,
  icon: string
): React.ComponentType | null => {
  if (!iconsMap[lib]) return iconsMap["io5"]["IoList"];

  return iconsMap[lib][icon] || iconsMap["io5"]["IoList"];
};
