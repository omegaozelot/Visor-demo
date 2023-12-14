let options = () => {
	return {
	    responsive: true,
	    scales: {
	      r: {
	        pointLabels: {
	          display: true,
	          centerPointLabels: true,
	          font: {
	            size: 15,
	            weight: 550
	          }
	        }
	      }
	    },
	    plugins: {
	      legend: {
	        position: 'top',
	      },
	      title: {
	        display: true,
	        text: 'Detected emotions'
	      }
	    }
	}
}

export default { options };