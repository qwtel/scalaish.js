import {Trait} from '../../helpers/Trait';
import {Class} from '../../helpers/Class';
import {TSeq, AbstractSeqImpl} from '../Seq';
import {TBufferLike} from './BufferLike';

var TBuffer = Trait("Buffer").with(TBufferLike).with(TSeq)({

});

function AbstractBufferImpl() {
}

Class("AbstractBuffer", AbstractBufferImpl).extends(AbstractSeqImpl).with(TBuffer)();

export {TBuffer, AbstractBufferImpl};
