import Layout from "@/components/Layout";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <Layout showFooter={true}>
      {/* Hero Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-500 mb-3">
                + 44,854 resumes created today
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                The professional resume builder
              </h1>
              <p className="text-lg mb-6 max-w-lg text-gray-600">
                Only 2% of resumes win. Yours will be one of them. Let's build you a resume that works.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8 md:justify-start justify-center">
                <Link href="/auth">
                  <Button
                    className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-6 py-2.5 rounded-md font-medium"
                  >
                    Create my resume
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  className="border border-gray-300 bg-white text-gray-900 px-6 py-2.5 rounded-md font-medium hover:bg-gray-50"
                >
                  Upload my resume
                </Button>
              </div>
              
              <div className="flex gap-10 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-xl font-semibold text-[#0d6efd]">39%</div>
                  <div className="text-sm text-gray-600">more likely to get hired</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-[#0d6efd]">8%</div>
                  <div className="text-sm text-gray-600">better pay with your next job</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative">
              <img 
                src="https://resume.io/assets/landing/desktop/hero-resume-1f70aa22ff6bc12c145161cd6d5506c8a7fa98c8df62594d3abc88dbefec4c9e.webp" 
                alt="Resume Example" 
                className="w-full rounded-lg shadow-lg z-10 relative"
              />
              <div className="absolute -top-3 -left-3 w-8 h-8 text-[#8062D6] text-2xl opacity-75">✦</div>
              <div className="absolute -bottom-3 -right-3 w-8 h-8 text-[#FBA834] text-2xl opacity-75">✦</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Counter Section */}
      <section className="bg-blue-50 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
            <path d="M7 18H17V16H7V18Z" fill="currentColor"/>
            <path d="M17 14H7V12H17V14Z" fill="currentColor"/>
            <path d="M7 10H11V8H7V10Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor"/>
          </svg>
          <span className="text-xl font-bold text-gray-700">44,854</span>
          <span className="text-gray-600">resumes created today</span>
        </div>
      </section>
      
      {/* Features Section - More minimal version */}
      <Features />
      
      {/* Company Logos */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-center text-gray-500 mb-10 font-medium">Our candidates have been hired at:</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="w-24 grayscale">
              <svg viewBox="0 0 134 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M59.5508 10.4322C59.1119 10.4322 58.7569 10.7872 58.7569 11.2261C58.7569 11.665 59.1119 12.02 59.5508 12.02H63.4291C63.868 12.02 64.2229 11.665 64.2229 11.2261C64.2229 10.7872 63.868 10.4322 63.4291 10.4322H59.5508Z" fill="black"/>
                <path d="M68.3693 2.99946C67.9304 2.99946 67.5754 3.35442 67.5754 3.79331C67.5754 4.2322 67.9304 4.58716 68.3693 4.58716H86.6299C87.0688 4.58716 87.4238 4.2322 87.4238 3.79331C87.4238 3.35442 87.0688 2.99946 86.6299 2.99946H68.3693Z" fill="black"/>
                <path d="M91.1562 2.99946C90.7173 2.99946 90.3624 3.35442 90.3624 3.79331C90.3624 4.2322 90.7173 4.58716 91.1562 4.58716H98.6289C99.0678 4.58716 99.4227 4.2322 99.4227 3.79331C99.4227 3.35442 99.0678 2.99946 98.6289 2.99946H91.1562Z" fill="black"/>
                <path d="M68.3693 6.56445C67.9304 6.56445 67.5754 6.91941 67.5754 7.35831C67.5754 7.7972 67.9304 8.15216 68.3693 8.15216H82.3545C82.7934 8.15216 83.1484 7.7972 83.1484 7.35831C83.1484 6.91941 82.7934 6.56445 82.3545 6.56445H68.3693Z" fill="black"/>
                <path d="M86.6348 6.56445C86.1959 6.56445 85.8409 6.91941 85.8409 7.35831C85.8409 7.7972 86.1959 8.15216 86.6348 8.15216H90.7676C91.2065 8.15216 91.5615 7.7972 91.5615 7.35831C91.5615 6.91941 91.2065 6.56445 90.7676 6.56445H86.6348Z" fill="black"/>
                <path d="M68.3693 10.1294C67.9304 10.1294 67.5754 10.4844 67.5754 10.9233C67.5754 11.3622 67.9304 11.7171 68.3693 11.7171H76.8916C77.3305 11.7171 77.6855 11.3622 77.6855 10.9233C77.6855 10.4844 77.3305 10.1294 76.8916 10.1294H68.3693Z" fill="black"/>
                <path d="M16.7871 0.5H108.213C117.256 0.5 124.5 7.74446 124.5 16.7871V16.7871C124.5 25.8298 117.256 33.0742 108.213 33.0742H16.7871C7.74446 33.0742 0.5 25.8298 0.5 16.7871V16.7871C0.5 7.74446 7.74446 0.5 16.7871 0.5Z" stroke="black"/>
              </svg>
            </div>
            <div className="w-10 grayscale">
              <svg viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.05807 0C7.05807 0 7.72379 2.47224 6.32388 4.95667C5.1992 6.89291 2.82851 8.67873 3.42851 11.7357C3.42851 11.7357 6.11342 11.5478 7.4378 7.92322C7.4378 7.92322 8.01046 11.2717 11.2957 13.6793C11.2957 13.6793 13.3781 10.7599 11.0236 8.02911C8.67693 5.3103 9.77854 2.82588 9.77854 2.82588C9.77854 2.82588 8.75221 3.17553 8.17383 3.17553C7.59544 3.17553 7.05807 2.71996 7.05807 2.71996C7.05807 2.71996 6.52071 3.17553 5.94232 3.17553C5.36393 3.17553 4.3376 2.82588 4.3376 2.82588C4.3376 2.82588 5.45136 5.3103 3.09248 8.02911C0.739813 10.7599 2.82226 13.6793 2.82226 13.6793C6.10759 11.2717 6.69241 7.92322 6.69241 7.92322C8.00545 11.5478 10.6904 11.7357 10.6904 11.7357C11.2904 8.67873 8.9197 6.89291 7.80594 4.95667C6.4002 2.47224 7.05807 0 7.05807 0Z" fill="black"/>
                <path d="M8.2334 13.9611H5.95654C5.95654 13.9611 6.41212 15.6063 6.41212 16.0618C6.41212 16.5174 6.41212 17 7.09489 17C7.77767 17 7.77767 16.5174 7.77767 16.0618C7.77767 15.6063 8.2334 13.9611 8.2334 13.9611Z" fill="black"/>
              </svg>
            </div>
            <div className="w-20 grayscale">
              <svg viewBox="0 0 79 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.5009 0L34.1768 16.1414H36.8282L38.0802 12.2654H44.0699L45.322 16.1414H48.0361L42.7748 0H39.5009ZM38.8196 9.86283L41.0619 3.35354H41.1229L43.3653 9.86283H38.8196Z" fill="black"/>
                <path d="M58.427 4.25252H58.4882C58.9761 4.04848 59.5248 3.90909 60.1346 3.80808C60.7444 3.70707 61.3236 3.65657 61.8723 3.65657C63.088 3.65657 64.1247 3.77273 64.9824 4.00505C65.8402 4.23737 66.5417 4.63131 67.087 5.18687L68.7066 3.35354C67.9745 2.70202 67.0557 2.22727 65.9503 1.92929C64.845 1.63131 63.5074 1.48232 61.9335 1.48232C61.1773 1.48232 60.3602 1.54798 59.4822 1.67929C58.6041 1.81061 57.7972 2.02525 57.0618 2.32323C56.3264 2.62121 55.6826 3.01515 55.126 3.50505L56.7457 5.36364C57.201 4.94949 57.7665 4.55556 58.427 4.25252Z" fill="black"/>
                <path d="M0 1.72729H3.13629V16.1414H0V1.72729Z" fill="black"/>
                <path d="M9.59605 6.62629H9.60986C9.60986 6.62629 9.83447 6.26768 10.1063 6.03536C10.3781 5.80304 10.7164 5.62896 11.1248 5.5049C11.5331 5.38084 12.008 5.31883 12.5525 5.31883C13.6882 5.31883 14.5116 5.59659 15.0227 6.15214C15.5338 6.70769 15.7894 7.54041 15.7894 8.6503V16.1414H12.7286V9.4147C12.7286 8.75253 12.6264 8.28788 12.422 8.02072C12.2177 7.75358 11.8573 7.61999 11.3403 7.61999C10.8233 7.61999 10.401 7.76768 10.0727 8.06307C9.74443 8.35847 9.58032 8.84161 9.58032 9.5151V16.1414H6.51953V5.60707H9.59605V6.62629Z" fill="black"/>
                <path d="M26.1855 5.31881C27.4013 5.31881 28.3609 5.70466 29.0657 6.47638C29.7704 7.2481 30.1223 8.35848 30.1223 9.80816V16.1414H27.0457V10.1237C27.0457 9.29064 26.9059 8.65152 26.6261 8.20637C26.3463 7.76122 25.8983 7.53861 25.2822 7.53861C24.8246 7.53861 24.4304 7.63861 24.0996 7.83861C23.7689 8.03863 23.5116 8.33155 23.3277 8.71739C23.1438 9.10323 23.0519 9.57817 23.0519 10.1423V16.1414H19.9752V5.60704H23.0519V6.60162H23.1129C23.4233 6.12677 23.8571 5.75555 24.4143 5.48799C24.9716 5.22043 25.5646 5.08669 26.1855 5.08669V5.31881Z" fill="black"/>
                <path d="M55.8612 12.8008H52.2373C52.296 13.7372 52.6237 14.4583 53.2203 14.9633C53.8169 15.4684 54.6167 15.721 55.6196 15.721C56.1732 15.721 56.6966 15.6299 57.1897 15.4481C57.6827 15.2659 58.1248 14.9936 58.5159 14.6309H58.5769L56.9572 16.4643C56.5042 16.785 55.9702 17.0305 55.3545 17.2011C54.7387 17.3716 54.0717 17.4568 53.3522 17.4568C52.1364 17.4568 51.0992 17.2289 50.2414 16.7734C49.3836 16.3179 48.7249 15.6752 48.2652 14.8459C47.8056 14.0163 47.5757 13.0405 47.5757 11.9184C47.5757 10.7847 47.8056 9.80062 48.2652 8.96749C48.7249 8.13433 49.3692 7.49162 50.1979 7.03941C51.0267 6.5872 51.9995 6.36102 53.1163 6.36102C54.1761 6.36102 55.0941 6.56767 55.8701 6.98095C56.6461 7.39424 57.244 7.99919 57.664 8.79582C58.084 9.59247 58.294 10.5515 58.294 11.6736C58.294 11.9507 58.285 12.2108 58.2672 12.4538C58.2493 12.697 58.2136 12.7903 58.1598 12.8008H55.8612ZM52.9981 8.49797C52.4262 8.49797 51.9447 8.67829 51.5533 9.03891C51.1621 9.39954 50.9303 9.90394 50.8583 10.5517H55.0137C54.9776 9.88956 54.7742 9.38135 54.4041 9.02696C54.0344 8.67244 53.57 8.49797 53.0109 8.49797H52.9981Z" fill="black"/>
                <path d="M74.5584 5.31881C75.7742 5.31881 76.7339 5.70466 77.4386 6.47638C78.1433 7.2481 78.4951 8.35848 78.4951 9.80816V16.1414H75.421V10.1237C75.421 9.29064 75.2811 8.65152 75.0014 8.20637C74.7216 7.76122 74.2736 7.53861 73.6575 7.53861C73.1999 7.53861 72.8057 7.63861 72.4749 7.83861C72.1441 8.03863 71.8869 8.33155 71.703 8.71739C71.5191 9.10323 71.4272 9.57817 71.4272 10.1423V16.1414H68.3506V0H71.4272V6.60162H71.4882C71.7986 6.12677 72.2325 5.75555 72.7897 5.48799C73.3469 5.22043 73.9429 5.08669 74.5658 5.08669L74.5584 5.31881Z" fill="black"/>
              </svg>
            </div>
            <div className="w-24 grayscale">
              <svg viewBox="0 0 110 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.52346 11.2247H22.9618V20.2753H36.5233V11.2247H53.9616V0.722656H5.52346V11.2247Z" fill="black"/>
                <path d="M61.0767 17.6082H53.9619V8.55859H86.0767V17.6082H78.9619V20.2752H61.0767V17.6082Z" fill="black"/>
                <path d="M93.3226 8.55859H86.0767V20.2752H109.962V11.2247H93.3226V8.55859Z" fill="black"/>
                <path d="M53.9619 0.722656V5.89134H86.0767V0.722656H53.9619Z" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section - Simplified */}
      <Pricing />
    </Layout>
  );
}
