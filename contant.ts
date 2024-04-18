import { bookArtist, promoteEvent, liveEvent, hostEvent } from "@/public";

const heroBentoLinks = [
  {
    link: "Book Artists",
    image: bookArtist,
    desc: "lorem2102 ekchwic hwo whci edheih ewiew ilhweiu eodj jqdjqchjoc ewouch ewoid jeiudhejdh lqihdbqehodj ejodheoudj 2epdiei.",
  },
  {
    link: "Promote your Event",
    image: promoteEvent,
    desc: "lorem2102 ekchwic hwo whci edheih ewiew ilhweiu eodj jqdjqchjoc ewouch ewoid jeiudhejdh lqihdbqehodj ejodheoudj 2epdiei.",
  },
  {
    link: "Explore Live Events",
    image: liveEvent,
    desc: "lorem2102 ekchwic hwo whci edheih ewiew ilhweiu eodj jqdjqchjoc ewouch ewoid jeiudhejdh lqihdbqehodj ejodheoudj 2epdiei.",
  },
  {
    link: "Host New Event",
    image: hostEvent,
    desc: "lorem2102 ekchwic hwo whci edheih ewiew ilhweiu eodj jqdjqchjoc ewouch ewoid jeiudhejdh lqihdbqehodj ejodheoudj 2epdiei.",
  },
];

const userSignUpOptions: {
  userType: "user" | "artist" | "";
  userTypeDesc: string[];
}[] = [
  {
    userType: "user",
    userTypeDesc: [
      "Participate in various events",
      "Promote your event",
      "Host new Event",
    ],
  },
  {
    userType: "artist",
    userTypeDesc: [
      "Bulid up your Exclusive Profile",
      "Get registered for various events",
      "Get paid for your show",
    ],
  },
];

export { heroBentoLinks, userSignUpOptions };
