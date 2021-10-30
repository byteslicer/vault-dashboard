import { DefineComponent } from 'vue';
import Stat from '../components/Stat.vue';
import Chart from '../components/AChart.vue';
import Test from '../components/Test.vue';
import StreamingPrice from './StreamingPrice.vue';
import OraclePrice from './OraclePrice.vue';
import Rank from './Rank.vue';
import LockedTokens from './LockedTokens.vue';
import GraphQLChart from './GraphQLChart.vue';
import BackingCollateral from './BackingCollateral.vue';

export const widgetMap: Record<string, DefineComponent<any, any, any>> = {
  Stat: Stat,
  Chart: Chart,
  StreamingPrice: StreamingPrice,
  Rank: Rank,
  LockedTokens: LockedTokens,
  GraphQLChart: GraphQLChart,
  OraclePrice: OraclePrice,
  BackingCollateral: BackingCollateral,
};
