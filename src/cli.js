
import arg from 'arg'
import inq from 'inquirer'


const argsv = (opts) => {
    const args = arg({
        '--hello': String,
        '--set': Boolean
    },{
        argv: opts.slice(2)
    })

    return {
        hello: args['--hello'],
        set: args['--set']
    }
}

const cliPrompts = async (opts) => {

    if(opts.set){
        try {
            const connection = await inq.prompt([{
                name: 'nickname',
                type: 'input',
                message: 'Give connetion a nickname',
                default: 'nickname'
            },{
                name: 'username',
                type: 'input',
                message: 'Set the username',
                default: 'username'
            },{
                name: 'host',
                type: 'input',
                message: 'Set the host',
                default: 'host'
            }])

            const confirmation = await inq.prompt([{
                name: 'confirmation',
                type: 'confirm',
                message: `Is this correct \n -------\n nickname: ${connection.nickname} \n username: ${connection.username} \n host: ${connection.host} \n -------\n`   
            }])
        
            return {
                username: connection.username,
                confirmed: confirmation.confirmation,
                nickname: connection.nickname
            }
        }
        catch (error){
            alert("Something went wrong try again")
        }
    
    }

   
}


export async function cli(args){

    const options = argsv(args)
    const message =  await cliPrompts(options)
    console.log(message.nickname + " has been added")
   


}