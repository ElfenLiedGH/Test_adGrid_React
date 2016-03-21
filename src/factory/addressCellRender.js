import React from 'react';

export default class AddressCellRenderer extends React.Component {

    render() {
        var skills = [];
        var rowData = this.props.params.data;
        rowData.адрес.forEach( (skill) => {
            if (rowData.адрес[skill]) {
                skills.push(<img key={skill} src={'images/skills/' + skill + '.png'} width={16} title={skill} />);
            }
        });

        return <span>{skills}</span>;
    }

}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
SkillsCellRenderer.propTypes = {
    params: React.PropTypes.object
};