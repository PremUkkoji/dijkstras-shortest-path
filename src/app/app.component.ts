import { Component } from '@angular/core';
import { Point } from './models/Point';
import * as _ from "lodash"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'shortpath';

	messages = ["Click on a cell to select source", 
				"Click on a cell to select destination",
				"Click on cells to select barriers",
				"Click on Start Simulation to get the Shortest Path",
				"Cell already selected",
				"Simulation started"];
	message = "";
	flag = 0;
	board: any;
	edges = {};
	numberOfEdges: number;
	disableSimulation: boolean = true;

	constructor(){
		this.initializeBoard();
	}

	initializeBoard(){
		this.disableSimulation = true;
		this.message = this.messages[0];

		this.board = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		this.numberOfEdges = this.board.length * this.board[0].length;
		this.addEdges();
	}

	addEdges(){
		this.edges = {};
		for(var i=0;i<this.board.length;i++){
			for(var j=0;j<this.board[0].length;j++){
				var keyPoint = new Point();
				var valuePoint = new Point();
				keyPoint.x = i;
				keyPoint.y = j;
				var keyPointString = `${i}_${j}`;
				if(!this.edges.hasOwnProperty(keyPointString)){
					this.edges[keyPointString] = [];
				}
				if(i==0 && j==0){
					//top left corner
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j+1;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i+1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
				}else if(i==0 && j==this.board[0].length-1){
					//top right corner
					valuePoint = new Point();
					valuePoint.x = i+1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j-1;
					this.edges[keyPointString].push(valuePoint);
				}else if(i==this.board.length-1 && j==this.board[0].length-1){
					//bottom right corner
					valuePoint = new Point();
					valuePoint.x = i-1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j-1;
					this.edges[keyPointString].push(valuePoint);
				}else if(i==this.board.length-1 && j==0){
					//bottom left corner
					valuePoint = new Point();
					valuePoint.x = i-1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j+1;
					this.edges[keyPointString].push(valuePoint);
				}else if(i==0 && j>=1 && j<= this.board[0].length-2){
					//top line
					valuePoint = new Point();
					valuePoint.x = i+1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j-1;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j+1;
					this.edges[keyPointString].push(valuePoint);
				}else if(i>=1 && i<=this.board.length-2 && j==this.board[0].length-1){
					//right line
					valuePoint = new Point();
					valuePoint.x = i-1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i+1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j-1;
					this.edges[keyPointString].push(valuePoint);
				}else if(i==this.board.length-1 && j>=1 && j<= this.board[0].length-2){
					//bottom line
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j+1;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j-1;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i-1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
				}else if(i>=1 && i<=this.board.length-2 && j==0){
					//left line
					valuePoint = new Point();
					valuePoint.x = i-1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i+1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j+1;
					this.edges[keyPointString].push(valuePoint);
				}else{
					//middle cells
					valuePoint = new Point();
					valuePoint.x = i+1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i-1;
					valuePoint.y = j;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j+1;
					this.edges[keyPointString].push(valuePoint);
					valuePoint = new Point();
					valuePoint.x = i;
					valuePoint.y = j-1;
					this.edges[keyPointString].push(valuePoint);
				}
			}
		}
		console.log(this.edges)
	}

	removeEdge(i, j, valuePoint){
		// console.log(this.edges[`${i}_${j}`])
		_.remove(this.edges[`${i}_${j}`], (point) => {
			return (point.x === valuePoint.x && point.y === valuePoint.y);
		})
		// console.log(this.edges[`${i}_${j}`])
	}

	removeIncomingAndOutgoingEdges(i, j){
		var valuePoint = new Point();
		var temp: any;
		valuePoint.x = i;
		valuePoint.y = j;
		if(i==0 && j==0){
			//top left corner
			this.removeEdge(i, j+1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j+1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i+1, j, valuePoint);
			temp = new Point();
			temp.x = i+1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			temp = new Point();

		}else if(i==0 && j==this.board[0].length-1){
			//top right corner
			this.removeEdge(i, j-1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j-1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i+1, j, valuePoint);
			temp = new Point();
			temp.x = i+1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else if(i==this.board.length-1 && j==this.board[0].length-1){
			//bottom right corner
			this.removeEdge(i-1, j, valuePoint);
			temp = new Point();
			temp.x = i-1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j-1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j-1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else if(i==this.board.length-1 && j==0){
			//bottom left corner
			this.removeEdge(i-1, j, valuePoint);
			temp = new Point();
			temp.x = i-1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j+1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j+1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else if(i==0 && j>=1 && j<= this.board[0].length-2){
			//top line
			this.removeEdge(i+1, j, valuePoint);
			temp = new Point();
			temp.x = i+1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j+1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j+1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j-1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j-1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else if(i>=1 && i<=this.board.length-2 && j==this.board[0].length-1){
			//right line
			this.removeEdge(i, j-1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j-1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i-1, j, valuePoint);
			temp = new Point();
			temp.x = i-1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i+1, j, valuePoint);
			temp = new Point();
			temp.x = i+1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else if(i==this.board.length-1 && j>=1 && j<= this.board[0].length-2){
			//bottom line
			this.removeEdge(i-1, j, valuePoint);
			temp = new Point();
			temp.x = i-1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j+1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j+1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j-1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j-1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else if(i>=1 && i<=this.board.length-2 && j==0){
			//left line
			this.removeEdge(i-1, j, valuePoint);
			temp = new Point();
			temp.x = i-1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i+1, j, valuePoint);
			temp = new Point();
			temp.x = i+1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j+1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j+1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}else{
			//middle cells
			this.removeEdge(i-1, j, valuePoint);
			temp = new Point();
			temp.x = i-1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i+1, j, valuePoint);
			temp = new Point();
			temp.x = i+1;
			temp.y = j;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j-1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j-1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
			this.removeEdge(i, j+1, valuePoint);
			temp = new Point();
			temp.x = i;
			temp.y = j+1;
			this.removeEdge(valuePoint.x, valuePoint.y, temp);
		}
	}

	source = new Point();
	destination = new Point();
	barrier: Point;
	barriers: Point[] = [];
	simulationInProgress = false;

	cell: any;
	cellClicked(row, col){
		if(!this.simulationInProgress){
			if(this.flag == 0){
				this.cell = <HTMLElement> document.getElementById(`${row}_${col}`);
				this.cell.classList.add("source");
				this.flag = 1;
				this.message = this.messages[1];
				this.source.x = row;
				this.source.y = col;
			}else if(this.flag == 1){
				if( row == this.source.x && col == this.source.y ){
					this.message = this.messages[4];
					return;
				}
				this.cell = <HTMLElement> document.getElementById(`${row}_${col}`);
				this.cell.classList.add("destination");
				this.flag = 2;
				this.message = this.messages[2];
				this.destination.x = row;
				this.destination.y = col;
				this.disableSimulation = false;
			}else{
				if( (row == this.source.x && col == this.source.y) || (row == this.destination.x && col == this.destination.y) ){
					this.message = this.messages[4];
					return;
				}
				this.barrier = new Point();
				this.barrier.x = row;
				this.barrier.y = col;
				this.removeIncomingAndOutgoingEdges(row, col);
				this.barriers.push(this.barrier);
				this.cell = <HTMLElement> document.getElementById(`${row}_${col}`);
				this.cell.classList.add("barrier");
				this.message = this.messages[2];
			}
		}
	}

	resetClicked(){
		this.flag = 0;
		this.message = this.messages[0];
		this.simulationInProgress = false;

		// removing source css
		this.cell = <HTMLElement> document.getElementById(`${this.source.x}_${this.source.y}`);
		this.cell.classList.remove("source");

		// removing destination css
		this.cell = <HTMLElement> document.getElementById(`${this.destination.x}_${this.destination.y}`);
		this.cell.classList.remove("destination");

		// removing barriers css
		for(var i=0;i<this.barriers.length;i++){
			this.cell = <HTMLElement> document.getElementById(`${this.barriers[i].x}_${this.barriers[i].y}`);
			this.cell.classList.remove("barrier");
		}

		this.barriers = [];
		this.initializeBoard();

	}

	startSimulation(){
		this.simulationInProgress = true;
		this.disableSimulation = true;

		this.dijkstras(this.board.length * this.board[0].length);
	}

	inf = 9999999;

	getMinDistIndex(dist, inMST, V){
		var mn = this.inf;
    	var mi;

		// get minimum distance vertex which is not in mst
		for(var i=0;i<this.board.length;i++){
			for(var j=0;j<this.board[0].length;j++){
				if(!inMST[`${i}_${j}`] && dist[`${i}_${j}`] < mn){
					mn = dist[i];
					mi = `${i}_${j}`;
				}
			}
		}
		return mi;
	}

	sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do{
			currentDate = Date.now();
		}while(currentDate - date < milliseconds);
	}

	dijkstras(V){
		var dist = {};
		var inMst = {};
		var parent = {};
		var render = true;

	
		for(var i=0;i<this.board.length;i++){
			for(var j=0;j<this.board[0].length;j++){
				dist[`${i}_${j}`] = this.inf;
				inMst[`${i}_${j}`] = false;
				parent[`${i}_${j}`] = -1;
			}
		}
	
		dist[`${this.source.x}_${this.source.y}`] = 0;
		parent[`${this.source.x}_${this.source.y}`] = -1;
		for(var count=0;count<V-1;count++){
			// get vertex with minimum distance
			var u = this.getMinDistIndex(dist, inMst, V);

			if(u == undefined){
				this.message = "Path doesn't exists";
				render = false;
				break;
			}

			// include it in mst
			inMst[u] = true;
			var x = u.split("_")[0];
			var y = u.split("_")[1];

			// update dist if there is a better way of reaching any vertex(which is already not in mst)
			for(var i=0;i<this.edges[u].length;i++){
				var edge_end = `${this.edges[u][i].x}_${this.edges[u][i].y}`;
				if(!inMst[edge_end] && dist[u] + 1 < dist[edge_end]){
					dist[edge_end] = dist[u] + 1;
					parent[edge_end] = u;
				}
			}
		}
		
		// print dist of each vertex from src
		var node = `${this.destination.x}_${this.destination.y}`
		var source_edge = `${this.source.x}_${this.source.y}`;
		var edge_start;
		var rendering_nodes = [];

		if(render){
			do{
				edge_start = parent[node];
				if(edge_start != source_edge){
					rendering_nodes.push(edge_start);
				}
				node = edge_start;
			}while(edge_start != source_edge);

			var i = rendering_nodes.length-1;
			var task = setInterval(() => {
				this.cell = <HTMLElement> document.getElementById(rendering_nodes[i]);
				this.cell.classList.remove("visited");
				this.cell.classList.add("path");
				i = i-1;
				if(i==-1){
					clearInterval(task);
					this.message = "Hooray !!! We got there...";
				}
			}, 50);
		}
	}

	stopSimulation(){

	}
}
