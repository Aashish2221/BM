import { CardBody, Typography } from "@material-tailwind/react"
import Link from "next/link"
import { TiStarFullOutline } from "react-icons/ti"

const DealerCardBody = ({dealers}:any)=>{
    return(
        <>
        <CardBody className='mt-1 text-center sm:mt-1'>
        <Typography variant='h6' color='blue-gray'>
          <p className='text-xs underline line-clamp-1 hover:text-primary md:text-base lg:text-sm'>
            <Link
              target={'_blank'}
              href={dealers.detailUrl}
              passHref
              prefetch={false}
            >
              {dealers.aliasName}
            </Link>
          </p>

          <div className='mt-1 flex items-center justify-center md:mt-0 lg:mt-0'>
            {[...Array(5)].map((_, index) => (
              <TiStarFullOutline
                key={index}
                fill={
                  dealers.rating >= index + 1 ||
                  dealers.rating >= index + 0.5
                    ? '#E49E2F'
                    : '#C0C0C0'
                }
                className='h-4 w-4 text-yellow-500 md:h-6 md:w-6 lg:h-6 lg:w-6'
              />
            ))}
          </div>

          <p className='mt-2 h-4 text-xs font-extralight md:h-3 lg:mt-1 lg:h-6 xl:mt-2 xl:h-5 2xl:h-4'>
            {dealers.shippingDescription}
          </p>
        </Typography>
      </CardBody>
      </>
    )
}
export default DealerCardBody;