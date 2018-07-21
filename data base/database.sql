-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2018 at 06:18 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project1`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `hid` int(20) NOT NULL,
  `qid` int(20) NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `date` text COLLATE utf8_unicode_ci NOT NULL,
  `students` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='history';

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`hid`, `qid`, `username`, `date`, `students`) VALUES
(5, 0, '1', '2018-05-09', '[]'),
(6, 0, '1', '2018-05-09', '[]'),
(8, 0, '1', '2018-05-10', '[]'),
(9, 0, '1', '2018-05-10', '[]'),
(12, 27, '1', '2018-05-10T01:59:55.758Z', '[]'),
(13, 21, '1', '2018-05-10T03:17:41.981Z', '[{\"name\":\"ตะวัน\",\"correct\":1,\"score\":6969,\"select\":\"0\",\"time\":1525922199888,\"check\":\"yes\"},{\"name\":\"bonus\",\"correct\":1,\"score\":2902,\"select\":-1,\"time\":1525922203955,\"check\":\"yes\",\"TIMER\":0},{\"name\":\"B\",\"correct\":0,\"score\":0,\"select\":-1,\"time\":1525922203198,\"check\":\"no\",\"TIMER\":0},{\"name\":\"จิต\",\"correct\":0,\"score\":0,\"select\":-1,\"time\":1525922206241,\"check\":\"no\",\"TIMER\":0}]'),
(14, 32, '1', '2018-05-10T03:20:28.770Z', '[{\"name\":\" บลู\",\"correct\":3,\"score\":11673,\"select\":-1,\"time\":1525922415076,\"check\":\"yes\",\"TIMER\":0},{\"name\":\"bonus\",\"correct\":2,\"score\":11334,\"select\":-1,\"time\":1525922415386,\"check\":\"yes\",\"TIMER\":0},{\"name\":\"B\",\"correct\":2,\"score\":10289,\"select\":-1,\"time\":1525922415078,\"check\":\"yes\",\"TIMER\":0},{\"name\":\"บลู\",\"correct\":2,\"score\":5192,\"select\":-1,\"time\":1525922418213,\"check\":\"yes\",\"TIMER\":0}]'),
(15, 34, '1', '2018-05-25T00:55:32.627Z', '[]'),
(16, 34, '1', '2018-05-25T03:08:38.997Z', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `qid` int(20) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `xmlcode` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`qid`, `name`, `description`, `username`, `xmlcode`) VALUES
(21, 'โปรแกรมคำนวณพื้นที่สีเหลี่ยมผืนผ้า', 'ใช้สูตรพื้นฐาน', '1', '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables><variable type=\"\" id=\")s+mr)8Z~w0Hj-w4g$nj\">x</variable></variables><block type=\"my_setvariable\" id=\"HVLPz=s:@N:B{l^X=m[s\" x=\"0\" y=\"0\"><field name=\"count\" id=\")s+mr)8Z~w0Hj-w4g$nj\" variabletype=\"\">x</field><value name=\"var1\"><block type=\"my_number\" id=\"UG#|Ek[DDC19@YYZ|bBB\"><field name=\"number\">5</field></block></value><next><block type=\"ask_if\" id=\";UB2HWobV-+LTnz]-pH[\"><value name=\"condition\"><block type=\"my_condition\" id=\"Kfp~Uh^x!fRB8^AJ,vBU\"><field name=\"symbol\">==</field><value name=\"var1\"><block type=\"my_variable\" id=\"3Y,3+q$)uLhJjnd4(`O^\"><field name=\"setcount_set\" id=\")s+mr)8Z~w0Hj-w4g$nj\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"KLWz~QXsfJvc`0Hsa+jM\"><field name=\"number\">5</field></block></value></block></value><statement name=\"todo\"><block type=\"my_printf\" id=\"jKGPNAg0bdui9w4E*;xm\"><value name=\"var1\"><block type=\"my_variable\" id=\"Ak}5uU/Y6boLY[?4/!g2\"><field name=\"setcount_set\" id=\")s+mr)8Z~w0Hj-w4g$nj\" variabletype=\"\">x</field></block></value></block></statement></block></next></block></xml>'),
(27, 'โปรแกรมคำนวณพื้นที่สามเหลี่ยม', 'ใช้สูตรคำนวณแบบง่าย', '1', '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables><variable type=\"\" id=\"j!SdDJpo|f1%a`gmk20E\">w</variable><variable type=\"\" id=\"WozrZ7O;dp${%$K*xrIR\">h</variable><variable type=\"\" id=\"m1xUB`.BHHW]dpl2=LCU\">area</variable><variable type=\"\" id=\"aJ~}Y-0pz}x(5%){+Nax\">x</variable></variables><block type=\"my_setvariable\" id=\"xNm1}VdXyw+v-Ud#6HR8\" x=\"32\" y=\"93\"><field name=\"count\" id=\"WozrZ7O;dp${%$K*xrIR\" variabletype=\"\">h</field><value name=\"var1\"><block type=\"my_number\" id=\"a0KhW7;RZ;(!}lSL0$Ro\"><field name=\"number\">5</field></block></value><next><block type=\"my_setvariable\" id=\"_1n#M1`LHrL=tm1m+L#v\"><field name=\"count\" id=\"j!SdDJpo|f1%a`gmk20E\" variabletype=\"\">w</field><value name=\"var1\"><block type=\"my_number\" id=\"?=R0NB%N3A-[F5q+wsZB\"><field name=\"number\">3</field></block></value><next><block type=\"my_setvariable\" id=\"d2w-iw2S4b^l2%=?gI`2\"><field name=\"count\" id=\"m1xUB`.BHHW]dpl2=LCU\" variabletype=\"\">area</field><value name=\"var1\"><block type=\"my_math\" id=\"oLQA.o?*6.E%dPZu[N#J\"><field name=\"math\">*</field><value name=\"var1\"><block type=\"my_math\" id=\"Y$8jC6]X5AY5.}eR0V@0\"><field name=\"math\">/</field><value name=\"var1\"><block type=\"my_number\" id=\"WPU(xBCPhWwcc08+BCXz\"><field name=\"number\">1</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"C3=-j(8/`$Mi@HK.U*0d\"><field name=\"number\">2</field></block></value></block></value><value name=\"var2\"><block type=\"my_math\" id=\"9)c|l((Rm8/h:r6q/7uM\"><field name=\"math\">*</field><value name=\"var1\"><block type=\"variables_get\" id=\"G|SNbf[0roxPn)xXU`}R\"><field name=\"VAR\" id=\"j!SdDJpo|f1%a`gmk20E\" variabletype=\"\">w</field></block></value><value name=\"var2\"><block type=\"variables_get\" id=\"_$9DNP^bL[o=_}|q.-vg\"><field name=\"VAR\" id=\"WozrZ7O;dp${%$K*xrIR\" variabletype=\"\">h</field></block></value></block></value></block></value><next><block type=\"my_printf\" id=\"|Kj,sa!eWW0Vxi.JLJEl\"><value name=\"var1\"><block type=\"variables_get\" id=\"K%k9n@V6Cc4d|LKD.b9n\"><field name=\"VAR\" id=\"m1xUB`.BHHW]dpl2=LCU\" variabletype=\"\">area</field></block></value></block></next></block></next></block></next></block></xml>'),
(28, 'โปรแกรมยกกำลัง แบบลูป', 'ยากมากๆ ', '1', '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables><variable type=\"\" id=\"YxEtO|g6#+#9SX(sO6wq\">x</variable><variable type=\"\" id=\"B4M.#JCzD6|JI$PU9wsx\">degree</variable><variable type=\"\" id=\"wS5r{^^b2qu`gfEDr3P4\">i</variable><variable type=\"\" id=\"I2_QpMxGDQLRKUE^e%ag\">ans</variable></variables><block type=\"my_setvariable\" id=\"w:L3{CgJFq/%?VmaKvj.\" x=\"66\" y=\"60\"><field name=\"count\" id=\"YxEtO|g6#+#9SX(sO6wq\" variabletype=\"\">x</field><value name=\"var1\"><block type=\"my_number\" id=\"t#N+~RH8~#fxmDT[y]}i\"><field name=\"number\">5</field></block></value><next><block type=\"my_setvariable\" id=\"#fnzp9ei_-h,p[8x!gZ]\"><field name=\"count\" id=\"I2_QpMxGDQLRKUE^e%ag\" variabletype=\"\">ans</field><value name=\"var1\"><block type=\"my_number\" id=\"PVHgj*h_4!u_7$q;g}7)\"><field name=\"number\">1</field></block></value><next><block type=\"my_setvariable\" id=\"JNc/+Mz`YXH*#gLN!D)h\"><field name=\"count\" id=\"B4M.#JCzD6|JI$PU9wsx\" variabletype=\"\">degree</field><value name=\"var1\"><block type=\"my_number\" id=\",po6+oGN$X!vlpB(eAN~\"><field name=\"number\">4</field></block></value><next><block type=\"my_setvariable\" id=\"nB!/McOKPW%:yLic+j@B\"><field name=\"count\" id=\"wS5r{^^b2qu`gfEDr3P4\" variabletype=\"\">i</field><value name=\"var1\"><block type=\"my_number\" id=\"M/}[.uYW`h6X;h{$_{Vl\"><field name=\"number\">0</field></block></value><next><block type=\"my_while\" id=\"6aYs%},v-lP/Md/IiH(l\"><value name=\"condition\"><block type=\"my_condition\" id=\"Tu}X!eb!cz_M23U?9[n.\"><field name=\"symbol\">&lt;</field><value name=\"var1\"><block type=\"my_variable\" id=\":fL[9KekC1(CgFH3PC!q\"><field name=\"setcount_set\" id=\"wS5r{^^b2qu`gfEDr3P4\" variabletype=\"\">i</field></block></value><value name=\"var2\"><block type=\"my_variable\" id=\")Mon`QI97mvY.$S,[cE,\"><field name=\"setcount_set\" id=\"B4M.#JCzD6|JI$PU9wsx\" variabletype=\"\">degree</field></block></value></block></value><statement name=\"todo\"><block type=\"my_setvariable\" id=\"Ou5UuU=]QR6UI{oo9sk7\"><field name=\"count\" id=\"I2_QpMxGDQLRKUE^e%ag\" variabletype=\"\">ans</field><value name=\"var1\"><block type=\"my_math\" id=\"R-?=P~nc$RFT,Nq|qd{W\"><field name=\"math\">*</field><value name=\"var1\"><block type=\"my_variable\" id=\"fj:zLe|)l*O0iMq(^kC(\"><field name=\"setcount_set\" id=\"I2_QpMxGDQLRKUE^e%ag\" variabletype=\"\">ans</field></block></value><value name=\"var2\"><block type=\"my_variable\" id=\"51.R.$gf@UQ@FQ[EcZW/\"><field name=\"setcount_set\" id=\"YxEtO|g6#+#9SX(sO6wq\" variabletype=\"\">x</field></block></value></block></value><next><block type=\"my_setvariable\" id=\"S+l.TBK;UBy|J6D^cs4X\"><field name=\"count\" id=\"wS5r{^^b2qu`gfEDr3P4\" variabletype=\"\">i</field><value name=\"var1\"><block type=\"my_math\" id=\"b.P#|y$MxBEbpv@[lb_M\"><field name=\"math\">+</field><value name=\"var1\"><block type=\"my_variable\" id=\"Yv]yiKXb/AzblltE2[C$\"><field name=\"setcount_set\" id=\"wS5r{^^b2qu`gfEDr3P4\" variabletype=\"\">i</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"=04;|V4k;..7G{,83EXV\"><field name=\"number\">1</field></block></value></block></value></block></next></block></statement><next><block type=\"my_printf\" id=\"AW#HINZ%Z@TW;c.fTY[Y\"><value name=\"var1\"><block type=\"my_variable\" id=\"D{lc6.br^PIf$x8N*|eY\"><field name=\"setcount_set\" id=\"I2_QpMxGDQLRKUE^e%ag\" variabletype=\"\">ans</field></block></value></block></next></block></next></block></next></block></next></block></next></block></xml>'),
(32, 'คำนวณเกรด', 'ใช้ if ในการคำนวณหาเกรด', 'blue', '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables><variable type=\"\" id=\"o5~WR#1Bh}9evt},=ID4\">x</variable></variables><block type=\"my_scanf\" id=\"ZoPXtzq90oC=}~ak)bbU\" x=\"33\" y=\"18\"><value name=\"variable\"><block type=\"my_variable\" id=\":m?j;fEhlq5FI):v8vyT\"><field name=\"setcount_set\" id=\"o5~WR#1Bh}9evt},=ID4\" variabletype=\"\">x</field></block></value><next><block type=\"ask_ifelse\" id=\"SjtANN?S@mpI4yrg3cF6\"><value name=\"condition\"><block type=\"my_condition\" id=\"zz@_oNLVVcb8pt](m$)m\"><field name=\"symbol\">&gt;=</field><value name=\"var1\"><block type=\"my_variable\" id=\"W7/[p|IbSgC`O(qL$/9b\"><field name=\"setcount_set\" id=\"o5~WR#1Bh}9evt},=ID4\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"zVECJ]bPHLQUn-*j|ri.\"><field name=\"number\">80</field></block></value></block></value><statement name=\"todo1\"><block type=\"my_printf\" id=\"K1~,!x`jq}$oxMeWV*A2\"><value name=\"var1\"><block type=\"my_string\" id=\"BVuhAKA#M(hzIY2/ZNBY\"><field name=\"message_input\">grade A</field></block></value></block></statement><statement name=\"todo2\"><block type=\"ask_ifelse\" id=\"8AX6k(QDxpSaUT%VRJO$\"><value name=\"condition\"><block type=\"my_condition\" id=\"~77HFt9r3Q4Bp4BX{Bd4\"><field name=\"symbol\">&gt;=</field><value name=\"var1\"><block type=\"my_variable\" id=\"DY5ItKVR4}st-~ci$3tr\"><field name=\"setcount_set\" id=\"o5~WR#1Bh}9evt},=ID4\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"W1QnE5h?WzkLE@XNzMB6\"><field name=\"number\">70</field></block></value></block></value><statement name=\"todo1\"><block type=\"my_printf\" id=\"}w@XVTj3}#Y#8aohk/w6\"><value name=\"var1\"><block type=\"my_string\" id=\":}cPf-mrCLB9K8}gU|bb\"><field name=\"message_input\">grade B</field></block></value></block></statement><statement name=\"todo2\"><block type=\"ask_ifelse\" id=\"nElf85Jc6K1nI63-@-is\"><value name=\"condition\"><block type=\"my_condition\" id=\"M(79|^pbj3mPyBh[hBAm\"><field name=\"symbol\">&gt;=</field><value name=\"var1\"><block type=\"my_variable\" id=\"tcnWa4+T@dI15IJbV.m;\"><field name=\"setcount_set\" id=\"o5~WR#1Bh}9evt},=ID4\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"qti4:IcO_m@es~n}Q#/`\"><field name=\"number\">60</field></block></value></block></value><statement name=\"todo1\"><block type=\"my_printf\" id=\"6RvQ2rH3^:PlsRd_T.V:\"><value name=\"var1\"><block type=\"my_string\" id=\"PkTM74D:m;xzSXBWmm(9\"><field name=\"message_input\">grade C</field></block></value></block></statement><statement name=\"todo2\"><block type=\"ask_ifelse\" id=\"!P?aeW(jyfQF4N4nbZ#0\"><value name=\"condition\"><block type=\"my_condition\" id=\"M[1@72k4pnJkuQ.[r26|\"><field name=\"symbol\">&gt;=</field><value name=\"var1\"><block type=\"my_variable\" id=\"Jm{v.S]R:mOd71@_Ok}+\"><field name=\"setcount_set\" id=\"o5~WR#1Bh}9evt},=ID4\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"sJ{ZjmDf)c^L0I#~+$j+\"><field name=\"number\">50</field></block></value></block></value><statement name=\"todo1\"><block type=\"my_printf\" id=\"!%j8G/PxNmlDVP{KoYLV\"><value name=\"var1\"><block type=\"my_string\" id=\"+E7^1d1JpT8vRz[-lISW\"><field name=\"message_input\">grade D</field></block></value></block></statement></block></statement></block></statement></block></statement></block></next></block></xml>'),
(33, 'โปรแกรมเดาตัวเลข', 'ใช้ลูป do while\nใช้เงื่อนไข if', '1', '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables><variable type=\"\" id=\"93Rt0M+74eIX3B@),8Nn\">num</variable><variable type=\"\" id=\"S3C:HzQF@kAKOCprbLM$\">n</variable><variable type=\"\" id=\"b}e[?~[V2%A3+K~j[Asj\">x</variable></variables><block type=\"my_setvariable\" id=\"`c{l`u[+kl9aYmw%e_.j\" x=\"0\" y=\"0\"><field name=\"count\" id=\"93Rt0M+74eIX3B@),8Nn\" variabletype=\"\">num</field><value name=\"var1\"><block type=\"my_number\" id=\"v{K2][-NyLKLeO|+pc-F\"><field name=\"number\">13</field></block></value><next><block type=\"my_setvariable\" id=\"}aY_{TcB.:vB54G!g6,n\"><field name=\"count\" id=\"S3C:HzQF@kAKOCprbLM$\" variabletype=\"\">n</field><value name=\"var1\"><block type=\"my_number\" id=\"ytt2NV/oHEcvbfz{Y$2n\"><field name=\"number\">3</field></block></value><next><block type=\"my_dowhile\" id=\"`ivfm()aq6kqBQM_`+Oj\"><statement name=\"todo\"><block type=\"my_scanf\" id=\"{pE!KU?99SLk]qkEx212\"><value name=\"variable\"><block type=\"my_variable\" id=\"6TXe@J5GP)~0|os5`Bj3\"><field name=\"setcount_set\" id=\"b}e[?~[V2%A3+K~j[Asj\" variabletype=\"\">x</field></block></value><next><block type=\"ask_if\" id=\"1l0_?$?OQm!$4*.L.mo1\"><value name=\"condition\"><block type=\"my_condition\" id=\"0b$Gtje~p-O1)`^Sl[Rs\"><field name=\"symbol\">&gt;</field><value name=\"var1\"><block type=\"my_variable\" id=\"B?bZ3@,R8d+E;7IPDZxx\"><field name=\"setcount_set\" id=\"b}e[?~[V2%A3+K~j[Asj\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_variable\" id=\"tqtY*ZSOzzXfQBx5OQ.U\"><field name=\"setcount_set\" id=\"93Rt0M+74eIX3B@),8Nn\" variabletype=\"\">num</field></block></value></block></value><statement name=\"todo\"><block type=\"my_printf\" id=\"Jm+,g7[)sttVeoVPPJ^U\"><value name=\"var1\"><block type=\"my_string\" id=\"vwWc+o?i{7^$XM=j3frk\"><field name=\"message_input\">มากไป</field></block></value></block></statement><next><block type=\"ask_if\" id=\"pWUeO3p:Nn.7;.m$B(Js\"><value name=\"condition\"><block type=\"my_condition\" id=\"uzQ^Bi8Rx7J5BDH)|Ona\"><field name=\"symbol\">==</field><value name=\"var1\"><block type=\"my_variable\" id=\"J+7m*xo:k.:Y^!ZeUaqv\"><field name=\"setcount_set\" id=\"b}e[?~[V2%A3+K~j[Asj\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_variable\" id=\"hrj-`mMYl:QfP2@]M;1u\"><field name=\"setcount_set\" id=\"93Rt0M+74eIX3B@),8Nn\" variabletype=\"\">num</field></block></value></block></value><statement name=\"todo\"><block type=\"my_printf\" id=\"?Exhr./t,vf#HZk.*6UR\"><value name=\"var1\"><block type=\"my_string\" id=\"H!zT$=F1:`zgoq6D{!K~\"><field name=\"message_input\">ถูกต้อง</field></block></value></block></statement><next><block type=\"ask_if\" id=\"JaSGNWVF!Lh_}A~HkC%*\"><value name=\"condition\"><block type=\"my_condition\" id=\"9Q_3*}`@qH1BHPR`K2E:\"><field name=\"symbol\">&lt;</field><value name=\"var1\"><block type=\"my_variable\" id=\"4F=`!0fn}:#dT|fZp28V\"><field name=\"setcount_set\" id=\"b}e[?~[V2%A3+K~j[Asj\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_variable\" id=\"_V_[U}A|zs4!Y$7}p5WW\"><field name=\"setcount_set\" id=\"93Rt0M+74eIX3B@),8Nn\" variabletype=\"\">num</field></block></value></block></value><statement name=\"todo\"><block type=\"my_printf\" id=\"SXJC0GSr6,LhV#a!A@$2\"><value name=\"var1\"><block type=\"my_string\" id=\"sR3f`rwFBgnD-.#5cK[F\"><field name=\"message_input\">น้อยไป</field></block></value></block></statement><next><block type=\"my_setvariable\" id=\"0Eb?*lMCsefLVG%f5n.n\"><field name=\"count\" id=\"S3C:HzQF@kAKOCprbLM$\" variabletype=\"\">n</field><value name=\"var1\"><block type=\"my_math\" id=\"VOrRvJCR1Rm|Owg*S}p?\"><field name=\"math\">-</field><value name=\"var1\"><block type=\"my_variable\" id=\"XEw`*j7zK`$vCcEE7d(o\"><field name=\"setcount_set\" id=\"S3C:HzQF@kAKOCprbLM$\" variabletype=\"\">n</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"c+Vanqgf9z7y_k%npEKE\"><field name=\"number\">1</field></block></value></block></value></block></next></block></next></block></next></block></next></block></statement><value name=\"condition\"><block type=\"my_compare\" id=\"ZOU}Z^PPjKz}wty]+4o|\"><field name=\"symbol\">&amp;&amp;</field><value name=\"var1\"><block type=\"my_condition\" id=\"@a._KFsRHi!0MusSF68o\"><field name=\"symbol\">!=</field><value name=\"var1\"><block type=\"my_variable\" id=\"IH{/8L[+-[ZU2l3O.L{c\"><field name=\"setcount_set\" id=\"b}e[?~[V2%A3+K~j[Asj\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_variable\" id=\"S*%[j(2VVcQH[Fz6$-jw\"><field name=\"setcount_set\" id=\"93Rt0M+74eIX3B@),8Nn\" variabletype=\"\">num</field></block></value></block></value><value name=\"var2\"><block type=\"my_condition\" id=\"P,46.iTTn%ymorsvsq7s\"><field name=\"symbol\">&gt;</field><value name=\"var1\"><block type=\"my_variable\" id=\"rh=;84~[pUZo`753@aTE\"><field name=\"setcount_set\" id=\"S3C:HzQF@kAKOCprbLM$\" variabletype=\"\">n</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"_xV;%*Q235u9QS{x$lPt\"><field name=\"number\">0</field></block></value></block></value></block></value></block></next></block></next></block></xml>'),
(34, 'โปรแกรมแฟกทอเรียลแบบใช้ฟังก์ชันรีเคอร์ซิฟ', 'ใช้บล็อคฟังก์ชันในการทำงาน', '1', '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables><variable type=\"\" id=\"`ar!WBj0r[;NBji{Z}_H\">myfac</variable><variable type=\"\" id=\"`9VFlP:f=Pi8geV-*[2z\">x</variable><variable type=\"\" id=\"wwN)nTpp9cQ8s]@}|t1r\">num</variable></variables><block type=\"my_declare_variable\" id=\"Un[I]UMut0.fi/zY_};q\" x=\"35\" y=\"73\"><field name=\"type\">int</field><field name=\"variableName\" id=\"wwN)nTpp9cQ8s]@}|t1r\" variabletype=\"\">num</field><next><block type=\"my_scanf\" id=\"PY)vZn$TKzg`genBT./x\"><value name=\"variable\"><block type=\"my_variable\" id=\"I-v|!beS4=MViK(9zL#J\"><field name=\"setcount_set\" id=\"wwN)nTpp9cQ8s]@}|t1r\" variabletype=\"\">num</field></block></value><next><block type=\"my_printf\" id=\"2y(IXWoYe/LY$L43@]eU\"><value name=\"var1\"><block type=\"my_callfunc_re\" id=\"MNeuatr[gIJip%wLBwq.\"><field name=\"name\" id=\"`ar!WBj0r[;NBji{Z}_H\" variabletype=\"\">myfac</field><value name=\"para1\"><block type=\"my_variable\" id=\"%8q./f%ash[]LWQQ:V^u\"><field name=\"setcount_set\" id=\"wwN)nTpp9cQ8s]@}|t1r\" variabletype=\"\">num</field></block></value></block></value><next><block type=\"my_boxfunc\" id=\"7LU=,kwVK2fER[U)ls^=\"><field name=\"type\">int</field><field name=\"NAME\" id=\"`ar!WBj0r[;NBji{Z}_H\" variabletype=\"\">myfac</field><field name=\"pt1\">int</field><field name=\"pt2\">int</field><field name=\"pt3\">int</field><field name=\"pt4\">int</field><value name=\"para1\"><block type=\"my_variable\" id=\"`s)X0bK*0XD^y,o/R|%X\"><field name=\"setcount_set\" id=\"`9VFlP:f=Pi8geV-*[2z\" variabletype=\"\">x</field></block></value><statement name=\"todo\"><block type=\"ask_if\" id=\"VcU,GGqtfW7Rxn5szB0=\"><value name=\"condition\"><block type=\"my_condition\" id=\"RAFWu=}]fyG7:`4-/n9Q\"><field name=\"symbol\">&gt;</field><value name=\"var1\"><block type=\"my_variable\" id=\"0I@[U^_mIU;vk?h`RrtD\"><field name=\"setcount_set\" id=\"`9VFlP:f=Pi8geV-*[2z\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"L?.*4$SjK=.XNvE5xKUz\"><field name=\"number\">1</field></block></value></block></value><statement name=\"todo\"><block type=\"my_setvariable\" id=\"q-9V$TOQm!.uZ_I)GtK/\"><field name=\"count\" id=\"`9VFlP:f=Pi8geV-*[2z\" variabletype=\"\">x</field><value name=\"var1\"><block type=\"my_math\" id=\"#a5@g[{Vne9YP#zibco7\"><field name=\"math\">*</field><value name=\"var1\"><block type=\"my_variable\" id=\"V:SlnbSqP]%KnosLiXCr\"><field name=\"setcount_set\" id=\"`9VFlP:f=Pi8geV-*[2z\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_callfunc_re\" id=\"3PNmtO$NY5U9`WaW`6([\"><field name=\"name\" id=\"`ar!WBj0r[;NBji{Z}_H\" variabletype=\"\">myfac</field><value name=\"para1\"><block type=\"my_math\" id=\"=ay6h2VCB8$D}`i@o*Rn\"><field name=\"math\">-</field><value name=\"var1\"><block type=\"my_variable\" id=\"%Xgt94(A+/]yEM^$=C5%\"><field name=\"setcount_set\" id=\"`9VFlP:f=Pi8geV-*[2z\" variabletype=\"\">x</field></block></value><value name=\"var2\"><block type=\"my_number\" id=\"Xgfk1L~3ens|ajag](kE\"><field name=\"number\">1</field></block></value></block></value></block></value></block></value></block></statement></block></statement><value name=\"return\"><block type=\"my_variable\" id=\"iao@q@%{t...*_lOm)_t\"><field name=\"setcount_set\" id=\"`9VFlP:f=Pi8geV-*[2z\" variabletype=\"\">x</field></block></value></block></next></block></next></block></next></block></xml>');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `firstName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`username`, `password`, `email`, `firstName`, `lastName`) VALUES
('1', '356a192b7913b04c54574d18c28d46e6395428ab', '1', 'มงคล', 'มหาสมบัติ'),
('2', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'w@g', 't', 't'),
('a', '1', 't', 'f', 'l'),
('blue', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'w@g', 'วรพล', 'ทนันไชย'),
('teacher1', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 'ดร.', 'มั่งมี', 'ศรีสุข'),
('w', '356a192b7913b04c54574d18c28d46e6395428ab', 'asdf@asdf', 'วรพล', 'ทนันไชย');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`hid`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`qid`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `hid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `qid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
