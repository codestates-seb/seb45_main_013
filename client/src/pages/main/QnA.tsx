import styled from 'styled-components';
import { useState } from 'react';

import { Collapse, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const QnA = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  const handleClick = (id: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  return (
    <MainContainer>
      <HeaderTitle>FAQ</HeaderTitle>
      <FirstFAQ>
        <Question>1. 기본예절</Question>
      </FirstFAQ>
      <Divider />
      <ListItemButton onClick={() => handleClick('section1')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              분리불안과 무는 행동
            </>
          }
        />
        {open['section1'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section1'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="같이 자고 있을 때 만지거나 으르렁과 같은 경고 표시를 할 때는 만지지 않도록 해주시기 바랍니다. 신뢰가 쌓이지 않은 상황이나 스트레스가 클 경우 해당 상황이 반복 될 수 있습니다."
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section2')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              방문 앞에서 기다리는 강아지
            </>
          }
        />
        {open['section2'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section2'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="따로 잠자리를 분리하고 계시는 부분 너무 좋습니다. 1일 2-3회 산책과 실내 놀이 등 충분히 활동량과 호기심을 충족해주시고 말씀 드린 하우스 교육 정도로만 해주셔도 큰 어려움 없이 반려 생활을 이어나갈 것 같습니다 :-)

              곧 짖음이 시작 될 시기인데요, 다양한 사회화 교육 등 퍼피트레이닝을 공부하시거나 교육을 받아보시는 것도 권장 드리겠습니다 :-)"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section3')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              직접 주는 사료 안먹음
            </>
          }
        />
        {open['section3'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section3'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="반려견 교육을 하기 위해서는 손으로 음식을 먹는 것에 대한 거부감이 없어야 합니다. 이를 위해서는 스킨쉽을 아이가 스스로 보호자님에게 다가오지 않는 이상 최소화 해주시고 아이가 귀엽더라도 안는 행동은 가급적 삼가주시고 아이를 마주할 때에도 얼굴을 정면으로 마주하지 않고 측면으로 바라보면서 가벼운 스킨쉽, 사료를 제공하는 경험이 이루어졌으면 좋겠습니다. 보호자님과 신뢰관계가 쌓이면 충분히 금새 나아질 수 있으니 너무 조급해하지 마시고 아이에게 편안함을 제공해주시면 좋을 것 같습니다 :)
              
              "
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <FirstFAQ>
        <Question>2. 배변</Question>
      </FirstFAQ>
      <Divider />
      <ListItemButton onClick={() => handleClick('section4')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              갑자기 아무대나 배변을 해요
            </>
          }
        />
        {open['section4'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section4'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="배변 실수를 하였더라도 조용히 치워주시는 것 매우 잘 하셨습니다! 다만 다른 가족분들이 혼을 내실 경우 아이가 더욱 배변 실수가 이루어질 수 있으니 혼을 내지 못하도록 안내해주시기 바랍니다. 추가적으로 아이를 혼내지 않더라도 탄식이나 한숨과 같은 소리도 내지 않도록 유의해주시기 바랍니다.

              1. 화장실 발판, 러그, 이불에서 사료 또는 간식을 먹도록 해주세요.
              반려견은 자신이 쉬거나 음식을 섭취하는 곳에서 배변을 하기 싫어합니다. 따라서, 밥이나 간식을 급여 할 때 일반 바닥이 아닌 발판이나 배변 실수를 하는 곳 위에서 밥을 급여 해주세요.
              
              2. 배변 교육
              배변 패드의 위치, 배변 장소를 이해하면 잘 가릴 수 있습니다. 배변 장소를 알려주시기 위해서는 간식을 배변 패드 위에 올려두는 것이 아닌, 간식을 따라오게 만들어 배변 패드를 발로 밟을 수 있도록 도와주는 것입니다. 첫번째 내용에서 말씀 드린 것처럼 배변 패드 위에서 간식을 먹지 않도록 주의해주세요.
              
              추가적으로 배변을 하기 전의 전조 행동을 파악하여 배변 패드 방향으로 유도해주시면 좋을 것 같습니다 =)
              
              ⭐️ 위 내용과 더불어 훈련사 Q&A게시판 자주 묻는 질문 중 '배변 실수를 해요'의 글을 전체적으로 참고하여 우유에게 적용 시켜주시기 바랍니다 :)
              
              이해가 안되거나 교육하시면서 어려운 일이 있다면 언제든지 추가 질문 해주세요! 그럼 우유와 행복한 반려 생활이 되시기를 바랍니다🥰
              "
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section5')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              제가 없을때만 배변을 해요
            </>
          }
        />
        {open['section5'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section5'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="

              1. 반려견의 건강과 집안 환경을 점검해주세요.
              반려견 교육을 하기에 앞서 가장 기본적인 것은 환경 점검과 반려견의 건강입니다. 단순 분리 불안이 아닌 건강 이상 신호로 짐작해볼 필요가 있습니다. 또한 집안 환경이 반려견 스스로 편히 쉴 수 있는 켄넬과 같은 곳이 마련 되어 있는지, 방음이 잘 되고 있는지 등의 점검도 필요합니다.
              
              2. 평소 봄이와의 관계를 재정립 해주세요.
              항상 반려견과 같이 있을 수 있다면 무한한 사랑과 애정을 듬뿍 주어도 행복한 반려 생활이 될 수 있겠지만, 그럴 수 없다면 사랑과 애정은 독이 될 수 있습니다. 평소 반려견과 대화(말 걸기), 안아주기, 목적 없는 간식 급여 등은 보호자님에게 집착만 하는 관계로 이어질 수 있습니다. 이 밖에도 집착, 관심을 유도할만한 행동을 최대한 줄이고 분리 불안 교육을 진행하며, 반려견에게 해주어야 할 기본적인 것들 - 식사 급여, 산책 정도로만 해주세요. 이렇게 한다고 하여 반려견이 상처 받거나 힘들어하지 않으므로 보호자님께서 잘 지켜주시면 좋겠습니다.
              
              3. 반려견의 활동량을 충족해주세요.
              우리 사람도 만병의 근원을 스트레스라고 하는데요 반려견 또한 마찬가지입니다. 스트레스로 인해 일어나는 여러가지 문제 행동들 이 반려견의 문제 행동 솔루션 중 단골 솔루션 중 '산책'이 있는데요. 거의 모든 문제 행동에서 '산책'은 만병 통치약처럼 솔루션이 이루어지는 이유는 반려견의 활동량을 충분히 충족 시키고 후각 활동을 하고 바깥에서 배변을 하며 스트레스를 해소하고 건강한 에너지를 소모할 경우 굳이 문제 행동을 일어나지 않을 확률이 높습니다.
              
              * 주의 할 점은 활동량만을 충족 시켜주기 위해 공 놀이, 터그놀이, 뛰는 산책 등으로만 이루어지지 않았으면 좋겠고 적절히 이루어질 수 있도록 완급 조절 해주시면 좋겠습니다.
              
              3. 분리가 되는 장소에 대한 좋은 기억을 심어주세요.
              반려견에게 현관은 매우 긴장되는 곳입니다. 그 이유는 각종 소음이 들려오고 때로는 보호자님이 급하게 나갔다가 들어오고, 낯선 사람이 방문 하기도 하는 등 많은 일들이 일어나는 장소입니다. 신발장, 현관 앞에서 의자를 가져다 두고, 한편에는 반려견이 사용하는 방석 또는 켄넬을 가져다 두고 앉아서 쉬는 시간을 가졌으면 좋겠습니다. 그곳에서 휴대전화를 사용해도 좋으며, 중간에 현관문을 열었다가 다시 닫아도 좋고, 간식을 떨어뜨려 주어도 좋습니다. 반려견에게 이곳은 항상 긴장되는 일이 일어나는 곳이 아니란 것을 알려주세요.
              
              4. 올바르게 분리 되는 방법
              분리 불안을 해결 하기 위해 손바닥을 보여주며 다녀올게, 혹은 노즈워크를 펼쳐주고 반려견 몰래 분리 되는 등 여러가지 방법을 진행해주고 계시는 보호자님들이 있습니다. 하지만 이때 중요한 포인트를 놓치기도 하며, 잘못된 방법으로 진행하는 경우가 많습니다. 분리가 될 때 다녀올게라고 말을 하는 이유는 너와 나는 이제 분리가 될 거야 라는 것을 알려주는 것일뿐 나 간다?, 잘 있을 수 있지?, 그럼 간다?의 느낌이 아닙니다.
              
              반려견이 말에 대해 반응하지 않아도 되며, 이때 오히려 눈을 마주치거나, 이름을 부르면 굉장히 혼란스러울 것입니다. 반려견에게 눈을 마주치고, 이름이 불린다는 것은 좋은일이 일어나는 것이고, 보호자님에게 가야 하는 심리가 작용하게 되는데 분리가 된다면 이해하기 어렵고, 더욱 불안해 할 수 있으니 다녀올게 정도로만 말씀해주시고 분리 되어 주세요.
              
              5. 장난감 제공
              평소 보호자님과 같이 있을 때도 장난감을 제공해주고 계신다면 앞으로는 분리가 될 때에만 장난감을 제공해주시기 바랍니다. 노즈워크도 마찬가지로 보호자님과 분리가 되었을 때 흥미로운 것이 제공 된다는 점을 알려주세요. 또한, 자주 배변을 실수하는 곳에 위치 시켜주시면 배변 실수를 보다 방지할 수 있습니다.
              
              말씀 드린 내용 중 이해가 되지 않으시거나 추가 질문사항이 있으시다면 편하게 말씀 남겨주세요 :-)
              
              그럼 봄이와 행복한 반려 생활 되시기를 바랍니다🥰
              
              "
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <FirstFAQ>
        <Question>3. 산책</Question>
      </FirstFAQ>
      <Divider />
      <ListItemButton onClick={() => handleClick('section6')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              산책 때 다른 강아지를 보고 짖어요
            </>
          }
        />
        {open['section6'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section6'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="현재 지구에게는 훈련, 제지 등의 개념보다는 큰 자극 없이 다양한 경험을 시켜주는 것이 중요한데요.

              타 반려견과 직접적으로 접촉을 시도하신다면, 4-5개월까지는 지구와 비슷한 크기의 반려견, 나이와 상관 없이 타 반려견에게 무던한(관심이 없는) 상대 반려견을 접하시는 것이 좋으며 현재 상황에서는 멀리서 강아지가 지나가는 모습을 바라보는 것, 다른 반려견이 지나간 곳, 배변을 한 곳을 뒤따라 가는 정도가 좋습니다.
              
              지구가 다른 반려견에게 짖는 것에 대한 적절한 대처 방법은 특별한 것 없이 반응하지 않고 기다려 주는 것입니다. 여기서 반응이란 괜찮아, 아니야, 짖지마 및 목줄을 당기는 제지가 아닌 줄을 잡고 가만히 기다리는 것, 짖는 대상의 반대 방향으로 몸을 전환하여 지구가 스스로 피하게 끔 유도하는 정도로 해주시는 것입니다.
              
              현재 목줄을 잡아 당기는 것은 타 반려견에 대한 부정적인 인식으로 자리 잡을 수 있으므로 줄을 당기지 않도록 하는 것이 좋을 것 같습니다 :)
              
              지나가는 행인과의 부드러운 인사 방법은 보호자님의 역할도 중요하지만 대상(낯선 사람)의 도움이 필요합니다. 이를 위해서는 지구가 '앉아'리는 명령어를 완벽히 이해한 상태에서 지나가는 사람에게 사료나 간식을 드려 지구에게 앉아 라는 행동을 요구한 뒤 간식을 가볍게 던져주거나 가볍게 손 냄새 정도로만 맡게 해주세요. * 이 과정이 반복 되면 지나가는 사람과 가까워 졌을 때 앉는 행동이 강화 될 수 있습니다.
              
              추가적으로 지나가는 사람에 대한 관심이 보호자님의 부름보다 더 클 수 있으니 지구와의 상호작용을 만들어주시는 것이 좋습니다. 대표적인 상호작용은 입술 마찰음, 하이톤으로 짧게 2음절로 끊어 아이의 이름을 부르고 난 뒤 사료 나 간식을 제공 하는 등 보호자님 신호에 집중하는 교육이 필요할 수 있습니다.
              * 실내에서 먼저 진행하시길 권장드리며, 식사 시간에 대가 없이 사료를 제공하지 않고 상호 작용을 입히면서 사료를 조금씩 급여하면 더욱 효율적입니다.
              
              말씀 드린 내용 중 이해 되지 않으시거나 추가 질문 사항이 있으시다면 편하게 말씀 해주시기 바랍니다! 그럼 지구와 행복한 반려 생활 되시기를 바랍니다🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section7')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              산책 때 낑낑거림
            </>
          }
        />
        {open['section7'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section7'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="현재 아이의 행동은 
              1. 애정도를 줄여주세요.
              쓰다듬기, 눈 마주치기, 안아주기, 무릎에 올리기, 같이 잠자기 등과 같은 상황은 보호자에게 의존도를 높이게 됩니다. 이와 같은 상황을 최대한 줄여주세요. 스스로 코코가 다가온다면 손이 아닌 팔, 다리등으로 밀어내 주시고, 침대, 쇼파위에 올라오지 못하도록 미리 거절 하는 것을 연습해주세요.
              
              2. 하네스를 보여주고, 착용하고 좋은 일과 연결시켜주세요.
              현재 아찌는 산책에 대한 두려움이 있을 것으로 예상되는데요. 보호자님께서 산책줄을 손에 쥔 순간부터, 줄을 맨 직후부터 아찌는 긴장을 할 것 같습니다. 산책줄을 손에 쥐고 바로 바닥에 두어 사료 또는 간식을 뿌려주거나, 산책줄 착용 후 식사 급여 후 산책 줄을 벗겨주는 등의 연습을 시켜주신 다면 산책줄 착용하는 것에 대한 긴장과 불안함이 줄어들 수 있습니다.
              
              3. 집안 산책 및 짧은 산책
              산책 줄 착용 후 집안에서 돌아다니기 > 현관문에서 나갔다가 바로 다시 들어오기 > 5분 거리를 짧게 다녀오기 > 집 앞에서 앉아서 쉬기 등과 같은 내용을 점진적으로 진행해주시면 좋겠습니다.
              
              아찌에게 현재 필요한 교육 내용은 훈련사 Q&A > 자주 묻는 질문 > '산책을 무서워해요' 를 참고해주시면 아찌에게 매우 큰 도움이 될 것으로 보입니다.
              
              사회화 시기가 한창 진행중, 또는 끝난 지 얼마 되지 않은 반려견의 경우 조급하게 교육을 진행하시기보다 천천히 꾸준히 교육을 진행해주시면 좋겠습니다. 교육하시면서 어려운 점이나 궁금하신 사항은 언제든지 편하게 추가 질문 남겨주세요! 그럼 아찌와 행복한 반려 생활 되시기를 바랍니다 🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section8')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              야외에서만 분리불안이 있는 것 같아요
            </>
          }
        />
        {open['section8'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section8'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="먼저 자주 묻는 질문에 있는 분리불안이 있어요 글과 함께 아래 내용을 참고해주시면 좋겠습니다.

              1. 실내에서 기다려 연습하기
              '야외에서만' 분리불안이 있다하여도 기다려 라는 명령에를 완벽하게 이해할 줄 알아야 합니다. 집안에서 기다려를 시켰을 경우 제자리에서 최소 10m이상 떨어져도 스스로 잘 기다릴 수 있을 정도는 연습해주세요.
              
              2. 야외에서 기다려 연습하기
              나무나 기둥에 산책줄을 묶어두고(줄이 풀리지 않게 주의) 기다려 연습을 진행합니다.
              * 이때, 실내에서와 똑같이 거리를 한번에 늘리지 않도록 해주시며 10cm - 5m까지 차즘차즘 거리를 늘려주세요. 이때 아이에게 돌아가면 간식 보상을 해주시기 바랍니다.
              
              * 야외에서 노즈워크를 할 수 있도록 신호를 미리 입력하시는 것이 좋습니다. 집안에서 노즈워크를 제공할 때 기다려 이후 노즈워크를 제공해주면서 찾아!라는 신호를 입력해주시면 이를 응용하여 야외에서 간식을 뿌려 노즈워크를 진행해주세요. 단, 야외에서 노즈워크를 제공해줄 때에는 바닥에 이물질이 없는 지 주의해주시기 바랍니다.
              
              3. 분리 되는 신호 알려주기
              베리가 분리가 되면 불안해 한다는 것을 알기 때문에 빠르게 뛰어가거나 베리에게 안심을 시키기 위해 스킨쉽을 하거나 말을 걸고 분리 된다면 불안감이 더욱 커질 것입니다. 이것또한 기다려 교육과 마찬가지로 집안에서 화장실을 갈 때 처럼 공간 자체가 분리가 될 때마다 다녀올게 등 분리 신호를 알려주시고 이를 응용해서 야외에서도 적용 시켜주세요.
              
              위 내용 정도로만 꾸준히 잘 진행해주시면 어렵지 않게 분리 불안 교육이 가능하실 겁니다. 모든 교육이 마찬가지로 조급해하지 않는 것이 중요한데, 분리 불안 교육에서 가장 중요한 부분이 조급하지 않은 태도라고 볼 수 있겠습니다.
              
              말씀 드린 내용 중 이해가 되지 않으시거나 추가 질문 사항이 있으시다면 편하게 말씀해주세요! 그럼 베리와 행복한 반려 생활 되시기를 바랍니다🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <FirstFAQ>
        <Question>4. 공격성</Question>
      </FirstFAQ>
      <Divider />
      <ListItemButton onClick={() => handleClick('section9')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              고양이 훈련사분은 안계신가요?
            </>
          }
        />
        {open['section9'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section9'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="현재 상황에서 물릴 때 = 격리가 된다면 상황을 회피하는 것 외에 개선 되는 사항이 없으며 되려 무는 행동이 강화 될 수 있어 되도록 격리를 시키지 않도록 해주시고 아래 내용을 참고하여 진행해주시기 바랍니다.

              1. 적절한 대처 방법
              손이나 발을 움직일 때 사냥하듯 달려들거나 장난으로 시작한 깨물기가 심해진다거나 했을 때는, 행동을 즉시 멈추고 아이의 무게를 튕겨낸다는 느낌으로 강단 있게 밀쳐내주시기 바랍니다.
              * 이때 안돼, 스읍, 야와 같이 말은 하지 않도록 유의해주시기 바랍니다.
              
              고양이 쪽으로 한걸음 툭 한두번만에 간결하게 행동해 주시고, 혹시 아파서 참기가 힘들다면 미리 실내화 두꺼운 청바지를 입고 진행해주시기 바랍니다.
              
              2. 짧게 쓰다듬기
              스킨십을 하다 길어지면 갑자기 공격하는 반려묘들은 많습니다. 이런 행동이 반복되면 습관이 되어 무는 세기도 점점 심해지게 되는데요, 항상 부담되지 않을만큼 짧게 스킨십해주는 습관이 필요합니다. 항상 보호자님의 스킨십이 아쉽도록 짧게짧게 진행해 주세요!
              
              3. 손으로는 절대 놀아주지 않기 / 코 터치 교육하기
              장난식으로 무는 거라고 하더라도 절대 사람 손으로는 놀아주지 말아주세요!
              오히려 사람손을 입을 벌려 무는 것이 아니라 코로 터치만 하는 것으로 알려줄 수 있도록 손으로는 차분하게 코터치 교육만 진행해 주세요.
              간식이나 사료를 이용해 사람 손에 코를 살짝 댈때마다 칭찬하며 간식보상해주기
              
              4. 놀이를 통해 충분한 욕구 해소 시켜주기
              브리티쉬 숏헤어 친구들은 의외로 활동량이 많은 축에 속한다고 합니다. 사냥 놀이와 같은 놀이도 좋지만 아이가 흥분도가 올라가 공격성으로 이어질 수 있으니 사냥 놀이(낚시 놀이)를 해주실 경우 꼭 마무리는 흥분도를 낮출 수 있는 노즈워크 및 사료 등을 급여하여 놀이를 마무리 해주세요.
              
              말씀 드린 내용을 전반적으로 함께 진행해주시기 바라며, 이해가 되지 않으시거나 추가 질문이 있으시면 편하게 글 남겨주시기 바랍니다! 그럼 무냥이와 행복한 반려 생활 되시기를 바랍니다🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section10')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              입질
            </>
          }
        />
        {open['section10'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section10'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="여러가지 해결 방법이 있지만, 어떻게 장난감으로 놀아주고 개껌을 급여 하는지, 평소 반려견과 어떻게 생활 해야 하는지에 대한 내용이 부족하거나 있더라도 실천하지 않는 경우가 많으며 단순 해결책이 도구와 단편적인 행동보다 중요한 것들을 놓치는 경우가 많습니다. 아래의 내용을 각각의 교육 방법이 아닌 전체적으로 지켜줘야 하는 내용으로 참고해주세요.

              1. 보호자님의 손만이 아닌, 모든 사람의 손을 물지 않도록 해주세요. / 어떤 날은 귀여워서 그냥 물려줬다, 아프지 않으니까 물려줬다 와 같이 타협을 하는 것이 아닌, 일관성을 띄는 것이 중요합니다.
              
              2. 장난감, 물어 뜯어도 되는 것에 대한 특별함 주기
              장난감이 항상 방치가 되어 있다면 장난감에 대한 흥미가 금방 떨어져 다른 물건에 관심을 가지게 될 것입니다. 장난감을 항상 치워놔 주시고, 내가 아이를 온전히 케어 할 수 없을 때만 장난감 주시면 좋겠습니다.
               
              추가적으로 물어도 되는 장난감 반려견이 흥미를 느껴하는 장난감이라면 '우드스틱', 'KONG 장난감' 등이 있습니다. 이 장난감도 마찬가지로 평상시에 치워두셨다가 자리를 비울 때, 케어할 수 없을 때만 급여 하도록 해주세요.
              
              반려견에게 손을 물면 안된다는 것을 가르치기는 매우 어렵습니다. 불쾌 자극(꾸짖음, 체벌)을 줄 필요 없이 자리를 피하는 것처럼 아이가 좋아하는 자극(터치, 물려줌, 소리)을 제거해주는 것으로 생각해주세요. 좋아하는 자극이 꼭 스킨쉽이 아니더라도 지금처럼 살짝 밀치는 것은 오히려 장난으로 받아들여 질 수 있으니 강단 있게 밀쳐줄 필요가 있습니다.
              
              * 이미 물렸다면 위의 말씀드린 대로의 대처 방법 정도만 해주시고 이러한 활동적인 욕구를 놀이와 산책 등 다른 흥밋거리를 제공해 주세요. 
              
              여기서 많이 실수를 부분이 있다면 손을 물리면 그제서야 터그 놀이를 해주거나 다른 액션(산책을 나가기 위해 줄을 매는 등)을 해주는 것 입니다. 그렇게 된다면 반려견은 학습을 하게 됩니다. 원하는 것을 얻기 위해 무는 것으로만 해결하고자 하는 습성이 생길 수 있으므로 이점 유의해주셔야 하며, 터그 놀이를 진행하면 흥분도가 올라가 다시 손을 물 확률이 높으므로, 노즈워크 또는 산책을 통해 흥분을 가라 앉히는 것 또한 중요합니다.
              
              앞으로 6개월이 지나고 더 많은 일들이 있을 텐데요. 말씀드린 것들을 이행해주시고, 다양한 퍼피트레이닝 등 여러 경험을 시켜준다면 보다 행복한 반려 생활이 되지 않을까 싶습니다! 그럼 샤찌와 행복한 반려 생활이 되시기를 바라겠습니다 🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <FirstFAQ>
        <Question>5. 짖음</Question>
      </FirstFAQ>
      <Divider />
      <ListItemButton onClick={() => handleClick('section11')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              스킨쉽 하면 짖어요
            </>
          }
        />
        {open['section11'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section11'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="해당 증상에 대해서는 방울이와 보호자님의 전체적인 생활 습관(아이가 지내는 환경, 산책 횟수, 홀로 있는 시간 등)을 고려하여 교육 방법을 설정하는 것이 중요합니다.

              이외 1일 2회 산책, 독립 공간 마련(켄넬)이 기본적으로 이행 된다는 전제하에 아래 내용을 참고하여 진행해주시기 바랍니다.
              
              1. 아이가 흥분도를 낮출 때까지 기다려주세요.
              가까이 다가가 인사를 하실 필요 없이 아이가 스스로 긴장을 낮출 때 까지 기다려주세요.
              
              2. 한동안 불필요한 스킨쉽은 자제해주세요.
              해당 증상은 무분별한 스킨쉽이 지속적으로 이루어질 경우 나타날 수 있습니다. 산책줄 착용, 발 닦기 등과 같이 스킨쉽이 들어가야만 하는 상황에서만 스킨쉽을 해주시고 이외에는 스킨쉽을 하지 않도록 해주세요.
              * 아이가 지속적으로 짖어 짖음을 멈추기 위해 안거나 눈맞춤 및 답답한 마음에 한숨을 내쉬지 않도록 유의해주세요.
              
              위 말씀 드린 내용을 참고하시어 아이와 현재의 생활 습관, 환경 등의 내용을 추가하여 질문 남겨주시면 보다 정확한 솔루션을 드릴 수 있을 것 같습니다!
              
              그럼 방울이와 행복한 반려 생활 되시기를 바랍니다🥰
              "
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section12')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              짖음이 심해요
            </>
          }
        />
        {open['section12'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section12'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="첫번째로 혼을 내지 않도록 해주세요. 혼을 내게 되면 보호자님과 좋지 못한 관계가 형성 될 수 있으며, 외부 소음에 대한 경계가 더욱 심해질 수 있습니다. 그렇다고 하여 안아주거나 달래주는 것 또한 칭찬으로 받아 들여질 수 있으므로 하지 않는 것이 중요합니다.

              대처 방법으로는 단순히 관심을 주지 않는 방법도 있겠지만 이는 단편적인 예로써 되려 요구성 행동의 원인이 될 수 있습니다. 따라서, 다양한 원인(건강, 식습관, 평소 생활 습관 등)을 파악하는 것도 중요합니다. 
              
              짖음이 일어나기 전부터 평소 생활 하실 때 외부 소음에 근원지인 현관문 앞, 창문 앞, 현관 복도에서 같이 앉아서 쉬기도 하는 경험을 시켜주시고 아래의 내용을 함께 참고해주세요 :)
              
              1. 보호자님과의 관계 개선
              평소 생활 습관에 따라 아이의 입장에서 보호자는 내가 지켜야 하는 존재 또는 보호를 받을 수 없는 존재로 인식하여 스스로를 지키고자 하는 행동이 나타날 수 있습니다. 이를 방지하기 위해 평소 동구에게 지속적으로 말을 걸거나, 안아주는 등 지나친 스킨쉽이 이루어지지 않도록 해주세요.
              
              * 추가적으로 반려견에게 안정적이고 독립적인 공간(켄넬, 하우스)을 사용할 수 있도록 환경을 조성해주시고 하우스, 켄넬 교육을 통해 소음 및 짖음이 일어나면 독립 공간을 활용하도록 도와주세요.
              > Q&A게시판 우측 돋보기를 클릭 후 '하우스훈련하는법'을 검색하여 해당 글을 꼭 참고해주세요!
              
              2. 기본적인 생활, 활동 제공하기
              규칙적인 산책(1일 1회 이상)을 통해 스트레스 해소와 활동량을 충족 시켜 주시고, 산책 이외에도 실내에서 보호자님과 집안 산책, 터그 놀이, 노즈워크 등을 통해 건강하고 즐거운 생활 습관을 이어나가 주세요.
              
              * 건강하고 규칙적인 생활 습관만으로도 반려견 문제 행동의 50% 이상을 예방, 개선할 수 있습니다.
              
              - 타 반려견과의 사회성 관련
              
              반려견끼리의 사회성은 우리 사람이 조작적으로 개선해주기란 매우 어렵습니다. 대신, 타 반려견에게 익숙해질 수 있도록 환경을 조성해주어야 합니다.
              
              1. 애견 카페, 운동장의 방문을 지양해주세요.
              애견 운동장, 카페, 유치원의 경우 반려견이 피하고 싶으면 피할 수 있는 환경이 부족합니다. 보호자님과 함께 있다고 하더라도 긴장되는 상황이 생길 때마다 보호자님 품으로 도망가는 상황이 펼쳐진다면 스스로 타 반려견에 대해 적응하려고 하지 않을 수 있습니다. 물론, 반려견 전문 관리사님이 견종과 성향, 체급을 고려하여 적절히 반려견을 분리 시켜 반려견을 케어 하는 애견 유치원이라면 너무 좋습니다. 다만, 최종적으로 이 모든 공간에 성향이 젠틀한 반려견들만 있다면 매우 좋겠지만 현실적으로 반려견에게 부담스러운 상황이 불가피하게 마주할 수 있으므로, 애견 유치원을 택할 경우 직접 방문하여 케어의 방법, 사회화 교육에 대한 설명과 이해를 충분히 들으신 뒤 결정하시는 것이 좋겠습니다.
              
              2. 고정적인 산책 친구를 만들어주세요.
              다양한 반려견을 많이 만나는 경험보다 '반려견 자체'의 대한 두려움을 제거해주는 것이 첫 번째입니다. 이때 상대 반려견의 경우 성향과 행동이 모두 형성 된 2살 이상의 반려견이며 다른 반려견에게 크게 관심이 없는 반려견일 수록 좋습니다. 같이 붙어서 산책을 하지 않아도 상관 없습니다. 간격을 두고 서로 그림자처럼 산책을 하기도 하고 서로 교차하기도 하는 경험을 가져 주세요. / 모르는 반려견의 뒤를 15m-20m 거리를 두고 뒤를 쫓아가며 상대 반려견이 있던 장소(마킹)에서 냄새를 맡는 것도 큰 도움이 됩니다 :)
              * 서로의 장난감(공, 인형)을 만나기 전 서로 교환하는 경험을 해주세요. 타 반려견에 대한 정보를 간접적으로 느끼는 것에 큰 도움이 됩니다.
              
              위 말씀 드린 내용을 전체적으로 진행해주시기 바라며, 말씀 드린 내용 중 이해가 되지 않거나 추가 질문이 있으시다면 편하게 질문 남겨주세요! 그럼 봉봉이와 행복한 반려 생활 되시기를 바랍니다 🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section13')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              특정인이 있을 때만 짖어요
            </>
          }
        />
        {open['section13'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section13'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="유독 한 보호자님과의 강한 애착이 생겼다면 평소 같이 잠자리 들기, 스킨쉽, 안아주기, 무릎에 올려두기, 말 걸기 등과 같이 아이와 스킨쉽이 이루어지지 않도록 해주시는 것이 첫번째 입니다. 

              무릎에 올라오거나 쇼파, 침대 등에서 함께 머무르게 된다면 보호자님 품을 차지하기 위해 더욱 애착이 생길 수 있으므로, 이점 유의하시고 독립적인 공간(켄넬, 쿠션, 방석)을 현관을 마주하지 않고 먼 곳, 사람의 동선이 겹치지 않는 구석진 곳에 배치해주세요.
              
              * 안아 달라고 앞발로 매달리거나 쇼파, 침대 위에 올라오려고 한다면 팔꿈치 또는 다리로 밀어내어 거절 해주세요. 이때, 손을 사용해서 거절하게 되면 스킨쉽으로 간주 될 수 있으니 이점 유의해주시고 눈을 마주치지 않는 것이 중요합니다.
              
              위 사항은 모든 가족 구성원분들이 지켜주시면 또 다른 애착이 형성 되는 것을 방지 할 수 있는 점 유의해주시고, 산책, 개인기 교육, 켄넬 교육과 같은 기본적인 것들만 해주신다면 독립적인 성향을 가지는데에 큰 도움이 되며, 아이의 장난감이 집안에 항상 방치 되어 있지 않도록 해주시고 아이를 케어할 수 없을 때(잠자리에 들때, 홀로 남겨졌을 때 등)만 장난감을 제공해주시고 나머지는 항상 장난감을 치워놔주세요.
              
              위 내용을 참고하시고 현재와 같은 상황이 아니지만 충분히 다음과 같은 내용이 발생할 수 있어, Q&A 게시판 우측 돋보기를 클릭하여 <가족 특정인만 짖음>을 검색하여 참고하시면 많은 도움이 될 것 같습니다.
              
              진행하시면서 어려운 점이 있으시면 편하게 말씀 남겨주시기 바랍니다! 그럼 아이와 행복한 반려 생활 되시기를 바랍니다!🥰"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClick('section14')}>
        <ListItemText
          primary={
            <>
              <Typography component="span" color="primary">
                Q.
              </Typography>{' '}
              중성화 후 계속 되는 짖음
            </>
          }
        />
        {open['section14'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open['section14'] ?? false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton>
            <ListItemText
              primary="수술 후 아이들은 약간에 불편함, 스트레스 등 심리적인 불안정이 있는 상태입니다.
              넥카라는 수술한 부위에 그루밍 같은 행동을 하면서 2차적인 감염이 나타날 수 있어서 예방을 위해 안쓰러우셔도 해주시긴 해야합니다. 아직은 수술을 한지 얼마 지나지 않은 시간이라 적어도 1주일 정도는 안정을 취해주시고 완치 후 정상적인 일상을 할 수 있을 때 마찬가지로 보호자님과 활동, 고양이가 좋아하는 장난감, 켓잎, 마따따비 등 이용할 수 있는 모든 것을 이용하셔서 스트레스를 풀어주시면 좋을 것 같습니다! 
              화장실을 아이가 다니기 편하도록 덮개가 없는 오픈된 화장실로 바꿔주시면 좋을 것 같습니다!"
              sx={{ backgroundColor: '#DDE1EB' }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </MainContainer>
  );
};

export default QnA;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px;
`;

const HeaderTitle = styled.div`
  margin-top: -16px;
  font-weight: 700;
  font-size: 28px;
`;

const FirstFAQ = styled.div`
  margin-top: 28px;
  margin-bottom: 14px;
`;

const Question = styled.h1`
  ${(props) => props.theme.fontSize.s16h24};
  color: ${(props) => props.theme.colors.mainBlue};
`;
