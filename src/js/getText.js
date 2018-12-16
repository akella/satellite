
export default class MyText{
	constructor(){

		this.canvas = document.createElement('canvas');

		this.size = 1024;
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = this.size;
		this.canvas.height = this.size;
		this.color = '#ffffff';
		this.ctx.font = "130px Arial";
		this.fontface = "Arial";

		
		this.text = 'HELLO asd jahdgaj';

	}


	draw(){
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0,0,this.size,this.size);
		this.ctx.fillStyle = '#ffffff';
		this.ctx.clearRect(0,0,this.size,this.size);

		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';



		this.fitText(this.text, this.fontface, 0, 300,this.size);

		this.ctx.fillText(this.text, this.size/2, this.size/2);



		
		// this.ctx.fillRect(100, 100, 250, 250);
		// this.ctx.fillRect(600, 600, 250, 250);
	}

	fitText(text, fontface, min, max, size){
		if(max-min<1){
			return min;
		}
		let found;
		let test = min + (max-min)/2;
		console.log(test);

		this.ctx.font = test + 'px ' + this.fontface;

		this.measureText = this.ctx.measureText(text).width;
		if(this.measureText> size){
			found = this.fitText(text, fontface, min, test,size);
		} else{
			found = this.fitText(text, fontface, test, max,size);
		}

		return found;
	}
}