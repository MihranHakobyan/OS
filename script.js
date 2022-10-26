class HDD{
    static sektor1="hello";
    static sektor2="how are you";
    static sektor3="?";
}

class OS{
    table=[];
    table_fds={}
    open_file(pid,file_name){
        let fd
        if (!Object.keys(this.table_fds).includes(file_name)){
            fd =Math.max(Object.values(this.table_fds))+1
        }
        for(let i = 0;this.table.length>i;i++){
            if (this.table[i].pid==pid && Object.keys(this.table_fds).includes(file_name)){
                throw new Error("proccess alredy opened")
            }
        }
        this.table_fds[file_name]=fd
       return  this.table.push({
            pid,
            fd,
            cursor : 0
        })
    }
    close_file(pid,file_name){
        if (Object.keys(this.table_fds).includes(file_name)){
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[i].pid==pid&&this.table[i].fd==this.table_fds[`${file_name}`]){
                   this.table.splice(i,1)
                   delete this.table_fds[file_name]
                   return this.table
                }
            }
        }
    }
    read_file(pid,fd,cursor){
        for (let i = 0; i < this.table.length; i++) {
           if( this.table[i].pid==pid && this.table[i].fd==fd ){
               let file= Object.keys(this.table_fds).find(key => this.table_fds[key] === fd);
              let str=HDD[`${file}`].slice(this.table[i].cursor,cursor+this.table[i].cursor)
              this.table[i].cursor+=cursor
              return str
           }
        }
        throw new Error("bad request")
    }
    write_file(pid,fd,text){
        for (let i = 0; i < this.table.length; i++) {
            if( this.table[i].pid==pid && this.table[i].fd==fd ){
                let file= Object.keys(this.table_fds).find(key => this.table_fds[key] === fd);
                return HDD[`${file}`]+=" "+text
            }
        }
        throw new Error("bad request")
    }
}

let os=new OS
os.open_file(1,"sektor1")
os.open_file(1,"sektor2")
os.close_file(1,"sektor1")
console.log(os.read_file(1,2,3))
console.log(os.read_file(1,2,5))
console.log(os.write_file(1,2,"yes"))



