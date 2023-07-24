import { useState, useEffect } from 'react'
import AuthButtons from '@/components/AuthButtons'
import { auth } from '@/firebase/app'
import { Flex, Heading, Image, Text, Button } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import Link from 'next/link'

const Home = () => {
  const [user, loading] = useAuthState(auth)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const formatTime = (date: Date) => {
      const formatter = new Intl.DateTimeFormat([], {
        hour: '2-digit',
        hour12: false,
      })
      return parseInt(formatter.format(date))
    }

    const getGreeting = () => {
      const currentTime = formatTime(new Date())
      if (currentTime >= 0 && currentTime < 12) {
        return 'Good Morning'
      } else if (currentTime >= 12 && currentTime < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
    }

    setGreeting(getGreeting())
  }, [])

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      top={200}
      text-align="center"
      width={{ base: '80%', md: '60%', lg: '600px' }}
      height="100vh"
      mx="auto"
    >
      <Flex w="full" direction="column" align="stretch" textAlign="center">
        <Heading fontSize="20pt" fontWeight={700} mt={-40}>
          Welcome Back
        </Heading>
        <Text fontSize="14pt" mt={16}>
          {loading && '🕒 Checking authentication...'}
          {!loading &&
            user &&
            `${greeting} ${user?.displayName}, Glad to have you again!`}
          {!user && 'Kindly Sign In'}
        </Text>

        {!loading && user && (
          <>
            <div style={{ marginTop: '40px' }}>
              <Text>PAYMENT GATEWAY USING STRIPE</Text>
              <Button>
                <Link href="https://buy.stripe.com/test_28o6qP1vq3Pvflu000">
                  <span>Get started</span>
                </Link>
              </Button>
            </div>
            <div style={{ marginTop: '40px' }}>
              <Text>PAYMENT GATEWAY USING PAYPAL</Text>
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order?.create({
                      purchase_units: [
                        {
                          amount: {
                            value: '14.08',
                          },
                        },
                      ],
                    })
                  }}
                  onApprove={async (data, actions) => {
                    //optional chaining
                    const details = await actions.order?.capture()
                    const name = details?.payer?.name?.given_name
                    alert('Transaction completed by ' + name)
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </>
        )}

        <Flex mt={10}>
          <AuthButtons />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
