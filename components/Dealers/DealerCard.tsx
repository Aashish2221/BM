import { Card, CardHeader } from "@material-tailwind/react";
import Link from "next/link";
import DealerCardBody from "./dealercardbody";
import DealerCardFooter from "./dealercardfooter";

const DealerCard = ({dealers}:any)=>{
    return(
        <Card
        className='md:h-66 mx-auto mt-6 h-52 sm:h-72 md:mt-4 lg:mb-4 lg:mt-2 
     lg:h-64'
      >
        <CardHeader className='mx-2 -mt-2 shadow-none md:-mt-3 md:h-40 lg:-mt-7 lg:h-40'>
          <Link
            target='_blank'
            href={dealers.detailUrl}
            passHref
            prefetch={false}
          >
            <img
              src={dealers.image}
              alt=''
              className='mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40'
              height={400}
              width={400}
              loading='eager'
            />
          </Link>
        </CardHeader>
       {/* Dealer Card Body Component */}
        <DealerCardBody dealers={dealers} />
        {/* Dealer Card Footer Component */}
        <DealerCardFooter dealers={dealers} />
      </Card>
    )
}
export default DealerCard;