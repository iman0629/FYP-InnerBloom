import MainChatbot from "../components/ChatBot/MainChatBot/MainChatbot";
import GeneralModule from "../components/ChatBot/modules/GeneralModule";
import AnxietyModule from "../components/ChatBot/modules/SpecializedModule/AnxietyModule";
import BipolarModule from "../components/ChatBot/modules/SpecializedModule/BipolarModule";
import DepressionModule from "../components/ChatBot/modules/SpecializedModule/DepressionModule";
import OCDModule from "../components/ChatBot/modules/SpecializedModule/OCDModule";
import PhobiasModule from "../components/ChatBot/modules/SpecializedModule/PhobiasModule";

function ChatBot () {
    <>
    <MainChatbot/>
     <GeneralModule/>
     <AnxietyModule/>
     <DepressionModule/>
     <OCDModule/>
     <BipolarModule/>
     <PhobiasModule/>
    </>
}

export default ChatBot;