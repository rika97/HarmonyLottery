import React from 'react';

const videos = [
    { id: 1, title: "The Defiant: The Case for DeFi", url: 'https://youtu.be/dnefSfsngI8?si=BALy5OoiJBhHbbls', points: 100 },
    { id: 2, title: "FREE tokens for $ONE holders (not clickbait) - Stafi Protocol", url: 'https://youtu.be/s8Qv76ta4QI?si=E0tYf9Pq3y5lF31S', points: 100 },
    { id: 3, title: "The Defiant: What's up with $YFI and yEarn?", url: 'https://youtu.be/tYnwsbXVd1A?si=w3Xe49EAC5YlwO8W', points: 100 },
    { id: 4, title: "The Defiant: the ultimate guide to Yield Farming in DeFi", url: 'https://youtu.be/m6NBKQ9gaes?si=j_qChGLxPuvVnfbB', points: 100 },
    { id: 5, title: "Harmony + BUSD – payment solutions for cross-border finance #crossfi", url: 'https://youtu.be/0Ztq0nyD6Wk?si=3DfNJWLHXcaBBL8Q', points: 100 },
    { id: 6, title: "Create a blockchain token in LESS than a minute: Harmony HRC20", url: 'https://youtu.be/3B0xP7zgQ7I?si=E1tZMQohPU1RIuwB', points: 100 },
    { id: 7, title: "DEFI yield opportunities on Compound using ONE and Switchain (live demo with BAT)", url: 'https://youtu.be/j4bbpqhldRo?si=_HrRhpnEnv62pMmp', points: 100 },
    { id: 8, title: "Binance Stablecoin BUSD: Explained", url: 'https://youtu.be/OrFxyV6YCjw?si=72UYhIMHXtMa_ZRl', points: 100 },
    { id: 9, title: "Harmony Grantee: MoneyHome", url: 'https://youtu.be/ewd1ekAgBPs?si=awURRMHxmHo5kPD7', points: 100 },
    { id: 10, title: "DeFi's next big thing: JellySwap", url: 'https://youtu.be/UyN6GiVdMLk?si=nvoNv-Ax6acGAczE', points: 100 },
    { id: 11, title: "The Defiant: The Curious Case of the CRV Launch", url: 'https://youtu.be/NWkjdfyyIso?si=CFr60zSlJWS0hpdc', points: 100 },
    { id: 12, title: "The Defiant: The Great Governance Wars of DeFi: Curve vs 1inch", url: 'https://youtu.be/PVc4WiazoyY?si=-Ca-K39ngPySIyYT', points: 100 },
    { id: 13, title: "The Defiant: The Greatest $MEME Ever Told", url: 'https://youtu.be/6c2GERwmZPk?si=10lPLMVr0KEJUCD7', points: 100 },
    { id: 14, title: "HACKATHON UPDATE: Iris, an Ethereum // Harmony DeFi Bridge demo", url: 'https://youtu.be/xca3-aIW29U?si=_Dkk2AwD9QTjHt2e', points: 100 },
    { id: 15, title: "The Defiant: $SUSHI - the ballad of Chef Nomi - DeFi’s greatest ever story", url: 'https://youtu.be/Rv8PBP7eGNg?si=kirA0p5EsIydaUFl', points: 100 },
    { id: 16, title: "The Future of DeFi: UniFi Multichain Protocol", url: 'https://youtu.be/hS8z9G33FPI?si=ZH_cwrG49kn_KvbO', points: 100 },
    { id: 17, title: "HORIZON: the Harmony // Ethereum Bridge is live on Mainnet", url: 'https://youtu.be/QVTFjb1aInA?si=9YKzJhIo8sVamOop', points: 100 },
    { id: 18, title: "SWOOP: the Harmony cross-chain dex", url: 'https://youtu.be/kwPvhFqZTqo?si=OknrMFN4H0RRXiJp', points: 100 },
    { id: 19, title: "The DEFIANT guide to DIGITAL ART", url: 'https://youtu.be/kNvqazLSzcs?si=KIsNf4uBB3kwmrdN', points: 100 },
    { id: 20, title: "DeFi 101: dApps, Common Uses, DeFi vs CeFi", url: 'https://youtu.be/kNvqazLSzcs?si=hxojQ18E7TCR6U4T', points: 100 },
    { id: 21, title: "DeFi101: Self Custody, Permissionlessness, Trust, Intermediaries, Censorship, P2P, & KYC", url: 'https://youtu.be/9x848YEaSV0?si=ihnd5zD59wQD2o0T', points: 100 },
    { id: 22, title: "DeFi 101: Interoperability, Bitcoin, Ethereum, Top Tools & Teams", url: 'https://youtu.be/0KLtM1f_3QI?si=QMcsghss4j88KKq0', points: 100 },
    { id: 23, title: "DeFi 101: MakerDAO, Aave, Compound, Perpetual Swaps", url: 'https://youtu.be/yp1X5HWEn64?si=1tdZeiNX2Ykzc_Su', points: 100 },
    { id: 24, title: "DeFi 101: AMMs, DEX Aggregators, Yield Farming", url: 'https://youtu.be/tVLrtcbvzzM?si=ur2eBE32lKIbpIT_', points: 100 },
    { id: 25, title: "DeFi 101: Yearn Finance, DEX vs CEX, Layer 1 & Layer 2, Algorithmic Stablecoins", url: 'https://youtu.be/YLKOmPHI7Cs?si=EyBfKhiqQomPiGoa', points: 100 },
    { id: 26, title: "DeFi 101: Derivatives, Options, Insurance", url: 'https://youtu.be/CaMgdEH6UME?si=8QRvZXCpr6Ljp3en', points: 100 },
    { id: 27, title: "DeFi 101: Risks, Top Resources, Adoption, Gas Fees, The Future", url: 'https://youtu.be/YhEtaR2dRDw?si=HYfvfPlr25g36eA-', points: 100 }
];

const VideoList = ({ watchVideo, isVideoWatched }) => {
  const unwatchedVideos = videos.filter(video => !isVideoWatched(video.id));

  return (
    <div>
      {unwatchedVideos.length > 0 ? (
        unwatchedVideos.map(video => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <button onClick={() => watchVideo(video.id)}>Watch</button>
          </div>
        ))
      ) : (
        <p>No videos left to watch!</p>
      )}
    </div>
  );
};


export default VideoList;
