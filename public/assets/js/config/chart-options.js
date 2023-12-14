let options = chartData => {
	return {
			type: 'line',
			data: chartData,
			options: {
			    responsive: true,
			    interaction: {
			      mode: 'index',
			      intersect: false,
			    },
			    stacked: false,
			    plugins: {
			      title: {
			        display: true,
			        text: 'Gaze Tracker'
			      }
			    },
			    scales: {
			      y: {
			        type: 'linear',
			        display: true,
			        position: 'left',
			      },
			      y1: {
			        type: 'linear',
			        display: true,
			        position: 'right',

			        // grid line settings
			        grid: {
			          drawOnChartArea: false, // only want the grid lines for one axis to show up
			        },
			      },
			    }
			  },
			}
}

export default { options };