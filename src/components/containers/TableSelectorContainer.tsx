import { connect } from 'react-redux';

import TableSelector from '../TableSelector';
import { ACTIONS } from '../../store/actions';
import { RegionType, GroupType } from '../../types';

const mapDispatchToProps = (dispatch:any) => ({
    onClickRegion: (region: RegionType) => dispatch(ACTIONS.fetchDataFromRegionRequest({region})),
    onClickGroup: (group: GroupType) => dispatch(ACTIONS.fetchDataFromGroupRequest({group}))
})

export default connect(null, mapDispatchToProps)(TableSelector);
