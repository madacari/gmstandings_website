import { connect } from 'react-redux';

import TableSelector from '../TableSelector';
import { selectRegion, selectGroup } from '../../store/actions';
import { RegionType, GroupType } from '../../types';

const mapDispatchToProps = (dispatch:any) => ({
    onClickRegion: (region: RegionType) => dispatch(selectRegion(region)),
    onClickGroup: (group: GroupType) => dispatch(selectGroup(group))
})

export default connect(null, mapDispatchToProps)(TableSelector);
