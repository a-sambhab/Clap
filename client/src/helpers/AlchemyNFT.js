import {createAlchemyWeb3} from '@alch/alchemy-web3';

const apiKey = "633Ea-EZaGL_M9yIRCWk5uGxNAuR1mEu";


const web3 = createAlchemyWeb3(
    `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`,
)

export default async(ownerAdd, teamId)=>{
    const nfts = await web3.alchemy.getNfts({
        owner: ownerAdd
    });
    const arr = nfts.ownedNfts;
    let result = false;
    const address = "0xa5C936c97157291EB033BB39E95b8ED64021474f"
    function auth(item){
        for(let i = 0;i<item.length;i++){
            if(item[i].contract.address === address.toLowerCase() && Math.trunc(Number(item[i].id.tokenId)/10000000)===Number(teamId)){
                result=true;
                break;
            }
        }
    }
    auth(arr)
    //console.log(arr);
    return result;
}