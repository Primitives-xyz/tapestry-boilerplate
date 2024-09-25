'use client'

import { useCurrentWallet } from '@/components/auth/hooks/useCurrentWallet'
import { Button } from '@/components/common/button'
import { abbreviateWalletAddress } from '@/components/common/tools'
import { UnifiedWalletButton } from '@jup-ag/wallet-adapter'
import Link from 'next/link'

export function Header() {
  const { walletAddress, mainUsername, walletDisconnect } = useCurrentWallet()

  return (
    <div className="flex justify-between w-full mb-12 h-[60px]">
      <h1 className="text-4xl">
        <Link href="/" className="hover:opacity-80">
          Tapestry Boilerplate
        </Link>
      </h1>
      <div>
        {mainUsername && walletAddress ? (
          <div className="flex items-center">
            <div className="flex flex-col space-y-1 w-[100px]">
              <p className="truncate font-bold">{mainUsername}</p>
              <p className="text-xs">
                {abbreviateWalletAddress({
                  address: walletAddress,
                })}
              </p>
            </div>
            <Button onClick={walletDisconnect}>❌</Button>
          </div>
        ) : (
          <UnifiedWalletButton />
        )}
      </div>
    </div>
  )
}
