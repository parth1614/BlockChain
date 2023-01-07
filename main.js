const SHA256 = require('crypto-js/sha256');


class Block{
    
    constructor(index,timestamp,data,previousHash='', nonce = 0){
        
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }
    
    calculateHash(){
        
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
        
    }

    mineBlock(difficulty){
        
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
            
        }
        console.log("The block has been mined"+" "+this.hash);
        
    }

}

class BlockChain{
    
    constructor(){
        
        this.chain = [this.CreateGenisisBlock()];
        this.difficulty = 5;
    }
    
    CreateGenisisBlock(){
        return new Block(0,"02/04/2021","Genisis Block","0", 0);
    }
    
    getLatestBlock(){
        
        return this.chain[this.chain.length - 1];
        
    }
    
    addBlock(new_Block){
        
        new_Block.previousHash = this.getLatestBlock().hash;
        
       new_Block.mineBlock(this.difficulty);
        this.chain.push(new_Block);
        
    }
    
    isChainValid(){
        
        for(let i=1; i <this.chain.length;i++){
            
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
          }
        return true;
    }
}

let allegory = new BlockChain;

console.log("Mining Block 1.....");
allegory.addBlock(new Block(1,"05/04/2021",{amount:4}, '', 0));

console.log("Mining Block 2.....");
allegory.addBlock(new Block(2,"10/04/2021",{amount:16}, '', 0));

console.log("Mining Block 3.....");
allegory.addBlock(new Block(3,"16/04/2021",{amount:32}, '', 0));

//console.log("Is blockChain Valid?" + " "+ allegory.isChainValid());

//console.log(JSON.stringify(allegory,null,4));
