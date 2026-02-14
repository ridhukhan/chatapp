import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utilitis/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	// এই লগগুলো দেখো কনসোলে — এটা সবচেয়ে জরুরি!
	console.log("=== MESSAGE DEBUG ===");
	console.log("Current logged in user (authUser._id):", authUser?._id);
	console.log("Message senderId:", message.senderId);
	console.log("Message full object:", message);
	console.log("Selected conversation ID:", selectedConversation?._id);
	console.log("fromMe calculation:", message.senderId?.toString() === authUser?._id?.toString());
	console.log("======================");

	const fromMe = message.senderId?.toString() === authUser?._id?.toString();

	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-200";
	const textColor = fromMe ? "text-white" : "text-black";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="avatar" src={profilePic || "https://via.placeholder.com/40"} />
				</div>
			</div>
			<div className={`chat-bubble ${bubbleBgColor} ${textColor} ${shakeClass} pb-2`}>
				{message.message}
			</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;