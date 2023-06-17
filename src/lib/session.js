
import { browser } from '$app/environment';
import { linkbase ,services_linkbase} from '$lib/app';
export var token = undefined;
export var token_id = undefined;
export var account_id = undefined;

export var update_data = ()=>{
	if(browser){
		token = localStorage.token
		token_id = localStorage.token_id
		account_id = localStorage.account_id
	}
	
}
update_data();
export var getAccountData = async (_account_id)=>{

	if (token != undefined && token.length > 0) {

		const res = await fetch(services_linkbase+'/account/get_info', {
			method: 'POST',
			headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
			body: JSON.stringify({
				account_id:_account_id
			})
		})
		if(!res.ok){
			console.log("err");
			return;
		}
	
		var data = await res.json()

		return {nickname:data.nickname,icon:data.icon};
	}
}
export var logout = async () =>{

	const res = await fetch(services_linkbase+'/account/remove_token', {
		method: 'POST',
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			account_id:account_id,
			token_id:token_id,
			token:token
		})
	})
	if(!res.ok){
		console.log("err");
		return;
	}
	var data = await res.json()
	console.log(data)
	localStorage.removeItem("token");
	localStorage.removeItem("token_id");
	localStorage.removeItem("account_id");
}