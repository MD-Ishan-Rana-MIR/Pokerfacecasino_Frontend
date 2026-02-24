import Footer from '@/components/web/Footer'
import WebNavbar from '@/components/web/WebNavbar';

const layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <WebNavbar></WebNavbar>
            <div className='min-h-[calc(100vh-670px)]' >
                {
                    children
                }
            </div>
            <Footer></Footer>
        </>
    )
}

export default layout